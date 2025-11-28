const STORAGE_KEY = 'tarma_recuerdos_v1';

// Mapa centrado en NYC
const map = L.map('map').setView([-11.4167, -75.6833], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

let adding = false;
let markers = {};
let memories = loadMemories();

// Si no hay recuerdos, poner los iniciales
if (!memories || memories.length === 0) {
    memories = [
        { id: genId(), lat: -11.4167, lng: -75.6833, title: "Plaza de Armas", text: "El corazón de Tarma." },
        { id: genId(), lat: -11.4230, lng: -75.6850, title: "Catedral de Tarma", text: "Un lugar histórico." },
    ].sort((a, b) => a.title.localeCompare(b.title, 'es', { sensitivity: 'base' }));
    saveMemories(memories);
}

// Render inicial
memories.forEach(addMarkerFromMemory);

const addBtn = document.getElementById('addMemoryBtn');
const resetBtn = document.getElementById('resetBtn');
const listEl = document.getElementById('list');
const hint = document.getElementById('hint');

renderList();

// Eventos botones
addBtn.onclick = () => {
    adding = !adding;
    updateAddState();
};

resetBtn.onclick = () => {
    if (confirm("¿Eliminar todos los recuerdos?")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
    }
};

map.on('click', (e) => {
    if (!adding) return;

    const {lat, lng} = e.latlng;

    const title = prompt("Título del recuerdo:");
    if (!title) { adding=false; updateAddState(); return; }

    const text = prompt("Descripción del recuerdo:");

    const mem = { id: genId(), lat, lng, title, text: text || "" };

    memories.push(mem);
    saveMemories(memories);
    addMarkerFromMemory(mem);
    renderList();

    adding = false;
    updateAddState();
});

// -------------------- FUNCIONES --------------------

function addMarkerFromMemory(m) {
    const popupHTML = `
        <div class="popup-card">
            <h4>${escapeHtml(m.title)}</h4>
            <p>${escapeHtml(m.text)}</p>
            <div class="popup-actions">
                <button class="btn-edit" data-id="${m.id}">Editar</button>
                <button class="btn-del" data-id="${m.id}">Eliminar</button>
            </div>
        </div>
    `;

    const marker = L.marker([m.lat, m.lng]).addTo(map);
    marker.bindPopup(popupHTML);

    marker.on("popupopen", () => attachPopupHandlers(m.id));

    markers[m.id] = marker;
}

function attachPopupHandlers(id) {
    setTimeout(() => {
        const delBtn = document.querySelector(`.btn-del[data-id="${id}"]`);
        const editBtn = document.querySelector(`.btn-edit[data-id="${id}"]`);

        if (delBtn) delBtn.onclick = () => removeMemory(id);
        if (editBtn) editBtn.onclick = () => editMemory(id);
    }, 30);
}

function renderList() {
    listEl.innerHTML = "";
    [...memories].reverse().forEach(m => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <h3>${escapeHtml(m.title)} <span class="tag">NYC</span></h3>
            <small>${escapeHtml(m.text)}</small>
        `;
        item.onclick = () => {
            const mk = markers[m.id];
            map.setView(mk.getLatLng(), 15);
            mk.openPopup();
        };
        listEl.appendChild(item);
    });
}

function removeMemory(id) {
    memories = memories.filter(m => m.id !== id);
    saveMemories(memories);
    markers[id].remove();
    delete markers[id];
    renderList();
}

function editMemory(id) {
    const mem = memories.find(m => m.id === id);
    if (!mem) return;

    const newTitle = prompt("Editar título:", mem.title);
    if (newTitle !== null) mem.title = newTitle;

    const newText = prompt("Editar texto:", mem.text);
    if (newText !== null) mem.text = newText;

    saveMemories(memories);

    markers[id].setPopupContent(`
        <div class="popup-card">
            <h4>${escapeHtml(mem.title)}</h4>
            <p>${escapeHtml(mem.text)}</p>
            <div class="popup-actions">
                <button class="btn-edit" data-id="${mem.id}">Editar</button>
                <button class="btn-del" data-id="${mem.id}">Eliminar</button>
            </div>
        </div>
    `);

    renderList();
}

function updateAddState() {
    addBtn.textContent = adding ? "Cancelar" : "➕ Agregar recuerdo";
    hint.textContent = adding
        ? "Haz clic en el mapa para colocar el recuerdo."
        : "Haz clic en 'Agregar recuerdo' y luego en el mapa.";
}

function saveMemories(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function loadMemories() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

function genId() {
    return "m_" + Math.random().toString(36).substr(2, 9);
}

function escapeHtml(str) {
    return str
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");
}
