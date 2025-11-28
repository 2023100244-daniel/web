const loginBtn = document.getElementById("loginBtn");
const userInput = document.getElementById("usuario");
const passwordInput = document.getElementById("password");
const errorMsg = document.getElementById("errorMsg");
const togglePassword = document.getElementById("togglePassword");

const validUsers = ["Diana", "Gus Gus"];
const validPassword = "te elijo a ti";

if (loginBtn) {
    loginBtn.addEventListener("click", () => {
        const user = userInput ? userInput.value.trim() : "";
        const pass = passwordInput ? passwordInput.value.trim() : "";

        if (validUsers.includes(user) && pass === validPassword) {
            if (errorMsg) errorMsg.textContent = "";
            window.location.href = "presentacion/presentacion.html";
        } else {
            if (errorMsg) {
                errorMsg.textContent = "Usuario o contraseña incorrectos";
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        }
    });
}

if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    });
}
