document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
    const createAccountLink = document.getElementById("create-account");

    // Usuarios válidos
    const usuariosValidos = [
        { usuario: "admin", contrasena: "1234" },
        { usuario: "user", contrasena: "password" }
    ];

    // Redirigir a la página de registro
    createAccountLink.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Redirigiendo a la página de creación de cuenta...");
        // Aquí podrías redirigir a otra página, como registro.html
    });

    // Manejo del formulario de login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validar si el usuario y contraseña coinciden
        const usuarioValido = usuariosValidos.find(
            (u) => u.usuario === username && u.contrasena === password
        );

        if (usuarioValido) {
            // Si los datos son correctos, redirigir a 404.html
            window.location.href = "404.html";
        } else {
            // Mostrar mensaje de error si son incorrectos
            errorMessage.textContent = "Usuario o contraseña incorrectos.";
            errorMessage.style.color = "red";
        }
    });
});
