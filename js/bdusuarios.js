// Archivo para manejar registro de usuarios
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        // Validaciones
        if (!username || !email || !password || !confirmPassword) {
            errorMessage.textContent = "Todos los campos son obligatorios.";
            return;
        }
        if (password !== confirmPassword) {
            errorMessage.textContent = "Las contraseñas no coinciden.";
            return;
        }

        // Guardar usuario en LocalStorage
        const userData = { email, password };
        localStorage.setItem(username, JSON.stringify(userData));

        successMessage.textContent = "¡Registro exitoso!";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    });
});
