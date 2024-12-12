document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.getElementById("form-container");

    const manejarExpiracionSesion = () => {
        localStorage.removeItem("sessionId");
        localStorage.removeItem("sessionExpiry");
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

        if (sessionId && sessionExpiry && Date.now() < sessionExpiry) {
            const tiempoRestante = sessionExpiry - Date.now();

            setTimeout(() => {
                manejarExpiracionSesion();
            }, tiempoRestante);

            mostrarAppDados(); // Muestra la app de dados
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

    const configurarBotonModoOscuro = () => {
        const darkModeBtn = document.getElementById("dark-mode-btn");
        if (darkModeBtn) {
            darkModeBtn.addEventListener("click", alternarModoOscuro);
        }
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
                localStorage.setItem("loggedUser", username);
                iniciarSesionConTemporizador();
                mostrarAppDados();
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

    const mostrarAppDados = () => {
        const loggedUser = localStorage.getItem("loggedUser") || "Usuario";
        formContainer.innerHTML = `
            <div class="app-dados">
                <h1>¡Bienvenido, ${loggedUser}!</h1>
                <img id="dice-image" src="./imagenes/dice-1-regular-24.png" alt="Dado" width="100">
                <button id="roll-dice">Tirar Dado</button>
                <p>Resultado acumulado: <span id="total-score">0</span></p>
                <button id="logout-btn">Cerrar Sesión</button>
            </div>
        `;

        const diceImage = document.getElementById("dice-image");
        const rollDiceButton = document.getElementById("roll-dice");
        const totalScoreSpan = document.getElementById("total-score");
        const logoutButton = document.getElementById("logout-btn");
        let totalScore = 0;

        rollDiceButton.addEventListener("click", () => {
            const diceResult = Math.floor(Math.random() * 6) + 1;
            diceImage.src = `./imagenes/dice-${diceResult}-regular-24.png`;
            totalScore += diceResult;
            totalScoreSpan.textContent = totalScore;
        });

        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("sessionId");
            localStorage.removeItem("sessionExpiry");
            localStorage.removeItem("loggedUser");
            mostrarLogin();
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
                        <label for="contrasena">Contraseña</label>
                        <input type="password" id="contrasena" required>
                    </div>
                    <button type="submit">Registrar</button>
                </form>
            </div>
        `;

        const registerForm = document.getElementById("register-form");

        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value.trim();
            const apellido = document.getElementById("apellido").value.trim();
            const usuario = document.getElementById("usuario").value.trim();
            const contrasena = document.getElementById("contrasena").value.trim();

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
            usuarios.push({ nombre, apellido, usuario, contrasena });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Usuario registrado con éxito");
            mostrarLogin();
        });
    };

    verificarSesion();
    manejarModoOscuro();
    configurarBotonModoOscuro();
});