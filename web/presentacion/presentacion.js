
function irMenu() {
    window.location.href = "../menu/menu.html"; // el archivo que contendrá el menú
}


const video = document.querySelector(".fondo video");
const iconAudio = document.getElementById("icon-audio");

function toggleAudio() {
    if (video.muted) {
        video.muted = false;
        iconAudio.src = "img/audio.png"; // icono de sonido activado
    } else {
        video.muted = true;
        iconAudio.src = "img/no_audio.png"; // icono de sonido apagado
    }
}

setTimeout(() => {
    const btn = document.getElementById("continuar");
    btn.classList.add("visible"); // hace que aparezca y sea clickable
}, 30000);
