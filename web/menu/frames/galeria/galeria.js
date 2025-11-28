const DEFAULT_IMAGE = 'img/di.jpg'; // ruta de tu imagen predeterminada

let panels = JSON.parse(localStorage.getItem('diana_comic') || '[]');

// Si no hay viñetas, agregar una por defecto
if (panels.length === 0) {
    panels.push({
        title: 'Diana',
        text: 'Hola, soy Diana. Soy un poco renegona, dormilona, me gusta mucho el futbol y soy una muchacha trabajadora.',
        img: DEFAULT_IMAGE
    });
    localStorage.setItem('comic_panels', JSON.stringify(panels));
}

const container = document.getElementById('comicContainer');
const addBtn = document.getElementById('addBtn');
const titleInput = document.getElementById('titleInput');
const descInput = document.getElementById('descInput');
const imageInput = document.getElementById('imageInput');

function savePanels() {
  localStorage.setItem('comic_panels', JSON.stringify(panels));
}

function renderComic() {
  container.innerHTML = '';
  panels.forEach((panel, idx) => {
    const div = document.createElement('div');
    div.className = 'panel';
    div.innerHTML = `
      <h3>${panel.title}</h3>
      <p>${panel.text}</p>
      <img src="${panel.img}" alt="${panel.title}">
      <button>Eliminar</button>
    `;
    div.querySelector('button').onclick = () => {
      if(confirm('¿Eliminar esta viñeta?')) {
        panels.splice(idx,1);
        savePanels();
        renderComic();
      }
    };
    container.appendChild(div);
  });
}

addBtn.onclick = () => {
  const title = titleInput.value.trim();
  const text = descInput.value.trim();
  if(!title) return alert('Ingresa un título');

  if(imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      panels.push({ title, text, img: e.target.result });
      savePanels();
      renderComic();
    }
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // Usar imagen predeterminada si no sube ninguna
    panels.push({ title, text, img: DEFAULT_IMAGE });
    savePanels();
    renderComic();
  }

  titleInput.value = '';
  descInput.value = '';
  imageInput.value = '';
}

renderComic();
