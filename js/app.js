document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById("form-container");

    const manejarExpiracionSesion = () => {
        localStorage.removeItem("sessionId");
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        mostrarLogin();
    };

    const iniciarSesionConTemporizador = () => {
        const sessionId = Date.now(); // Identificador único basado en el tiempo actual
        localStorage.setItem("sessionId", sessionId);

        // Almacena el tiempo de expiración (10 minutos)
        localStorage.setItem("sessionExpiry", sessionId + 600000);

        setTimeout(() => {
            manejarExpiracionSesion();
        }, 600000);
    };

    const verificarSesion = () => {
        const sessionId = localStorage.getItem("sessionId");
        const sessionExpiry = localStorage.getItem("sessionExpiry");

        // Si hay un sessionId válido y la sesión no ha expirado, permanece en la sesión
        if (sessionId && sessionExpiry && Date.now() < sessionExpiry) {
            const tiempoRestante = sessionExpiry - Date.now();

            // Renueva el temporizador para la sesión
            setTimeout(() => {
                manejarExpiracionSesion();
            }, tiempoRestante);

            mostrarError404(); // Muestra la página de sesión activa
        } else {
            localStorage.removeItem("sessionId");
            localStorage.removeItem("sessionExpiry");
            mostrarLogin(); // Redirige al login si la sesión no es válida
        }
    };

    const manejarModoOscuro = () => {
        const modoOscuroActivado = localStorage.getItem("modoOscuro") === "true";

        if (modoOscuroActivado) {
            document.body.classList.add("modo-oscuro");
        } else {
            document.body.classList.remove("modo-oscuro");
        }
    };

    const alternarModoOscuro = () => {
        const modoOscuroActivado = document.body.classList.toggle("modo-oscuro");
        localStorage.setItem("modoOscuro", modoOscuroActivado);
    };

    const agregarBotonModoOscuro = () => {
        const botonModoOscuro = document.createElement("button");
        botonModoOscuro.textContent = "Alternar Modo Oscuro";
        botonModoOscuro.classList.add("modo-oscuro-boton");
        botonModoOscuro.addEventListener("click", alternarModoOscuro);
        document.body.appendChild(botonModoOscuro);
    };

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
                iniciarSesionConTemporizador();
                mostrarError404();
            } else {
                const errorMessage = document.getElementById("error-message");
                errorMessage.textContent = "Usuario o contraseña incorrectos.";
                errorMessage.style.color = "red";
            }
        });

        createAccountLink.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarRegistro();
        });
    };

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

        setTimeout(() => {
            manejarExpiracionSesion();
        }, 600000); // Tiempo límite en la página de registro

        const registerForm = document.getElementById("register-form");
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
                const errorMessage = document.getElementById("error-message");
                errorMessage.textContent = "Las contraseñas no coinciden.";
                errorMessage.style.color = "red";
                return;
            }

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            const usuarioExistente = usuarios.find((u) => u.usuario === usuario);

            if (usuarioExistente) {
                const errorMessage = document.getElementById("error-message");
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

    const mostrarError404 = () => {
        formContainer.innerHTML = `
            <div class="form-content">
                <h1 style="font-size: 3rem; color: red;">Error 404</h1>
                <button id="logout-btn" style="margin-top: 20px;">Cerrar sesión</button>
            </div>
        `;

        const logoutButton = document.getElementById("logout-btn");
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("sessionId");
            localStorage.removeItem("sessionExpiry");
            mostrarLogin();
        });
    };

    manejarModoOscuro();
    agregarBotonModoOscuro();
    verificarSesion(); // Verifica el estado de la sesión al cargar la página
});
