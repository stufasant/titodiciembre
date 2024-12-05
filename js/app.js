document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById("form-container");

    // Función para mostrar el formulario de login
    const mostrarLogin = () => {
        formContainer.innerHTML = `
            <div class="form-content">
                <h1 id="form-title">¡BIENVENIDOS!</h1>
                <form id="login-form">
                    <div class="input-group">
                        <label for="username">Usuario</label>
                        <input type="text" id="username" required>
                    </div>
                    <div class="input-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" id="login-btn">Ingresar</button>
                </form>
                <p id="error-message" class="error-message"></p>
                <p><a href="#" id="create-account">Crear cuenta</a></p>
            </div>
        `;

        const loginForm = document.getElementById("login-form");
        const errorMessage = document.getElementById("error-message");
        const createAccountLink = document.getElementById("create-account");

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioValido = usuarios.find(
                (u) => u.usuario === username && u.contrasena === password
            );

            if (usuarioValido) {
                alert("¡Inicio de sesión exitoso!");
                window.location.href = "404.html"; // Redirige a la página deseada
            } else {
                errorMessage.textContent = "Usuario o contraseña incorrectos.";
                errorMessage.style.color = "red";
            }
        });

        createAccountLink.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarRegistro();
        });
    };

    // Función para mostrar el formulario de registro
    const mostrarRegistro = () => {
        formContainer.innerHTML = `
            <div class="form-content">
                <h1 id="form-title">Crear Cuenta</h1>
                <form id="register-form" class="form-grid">
                    <div class="input-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" required>
                    </div>
                    <div class="input-group">
                        <label for="apellido">Apellido</label>
                        <input type="text" id="apellido" required>
                    </div>
                    <div class="input-group">
                        <label for="usuario">Usuario</label>
                        <input type="text" id="usuario" required>
                    </div>
                    <div class="input-group">
                        <label for="correo">Correo electrónico</label>
                        <input type="email" id="correo" required>
                    </div>
                    <div class="input-group">
                        <label for="password">Contraseña</label>
                        <input type="password" id="password" required>
                    </div>
                    <div class="input-group">
                        <label for="confirm-password">Confirmar contraseña</label>
                        <input type="password" id="confirm-password" required>
                    </div>
                    <button type="submit" id="register-btn">Registrarse</button>
                </form>
                <p id="error-message" class="error-message"></p>
                <div class="form-actions">
                    <p><a href="#" id="back-to-login">Volver al login</a></p>
                </div>
            </div>
        `;

        const registerForm = document.getElementById("register-form");
        const errorMessage = document.getElementById("error-message");
        const backToLoginLink = document.getElementById("back-to-login");

        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const usuario = document.getElementById("usuario").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirm-password").value.trim();

            if (password !== confirmPassword) {
                errorMessage.textContent = "Las contraseñas no coinciden.";
                errorMessage.style.color = "red";
                return;
            }

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioExistente = usuarios.find((u) => u.usuario === usuario);

            if (usuarioExistente) {
                errorMessage.textContent = "El nombre de usuario ya está en uso.";
                errorMessage.style.color = "red";
                return;
            }

            usuarios.push({ nombre, apellido, usuario, correo, contrasena: password });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.");
            mostrarLogin();
        });

        backToLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarLogin();
        });
    };

    mostrarLogin();
});
