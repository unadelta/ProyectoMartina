<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const alertBox = document.getElementById('alert-box');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const btnLogout = document.getElementById('btn-logout');
    const userWelcome = document.getElementById('user-welcome');

    // Manejo del Envío del Formulario de Login
    loginForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Ocultar alerta
                alertBox.classList.add('hidden');

                // Limpiar formulario
                loginForm.reset();

                // Personalizar bienvenida
                userWelcome.textContent = `Bienvenido(a), ${data.usuario.nombre || data.usuario.usuario}. Seleccione una opción de la barra de herramientas superior para comenzar.`;

                // Transición de vistas: Ocultar Login y Mostrar Dashboard
                loginSection.classList.add('hidden');
                dashboardSection.classList.remove('hidden');
            } else {
                // Mostrar mensaje de error
                alertBox.textContent = data.message || 'Credenciales incorrectas';
                alertBox.classList.remove('hidden');
                alertBox.className = 'alert alert-error';
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            alertBox.textContent = 'Error de conexión con el servidor.';
            alertBox.classList.remove('hidden');
            alertBox.className = 'alert alert-error';
        }
    });

    // Botón para Regresar / Cerrar Sesión
    btnLogout.addEventListener('click', () => {
        // Ocultar Dashboard y volver a mostrar Login
        dashboardSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });
=======
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const alertBox = document.getElementById('alert-box');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const btnLogout = document.getElementById('btn-logout');
    const userWelcome = document.getElementById('user-welcome');

    // Manejo del Envío del Formulario de Login
    loginForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Ocultar alerta
                alertBox.classList.add('hidden');

                // Limpiar formulario
                loginForm.reset();

                // Personalizar bienvenida
                userWelcome.textContent = `Bienvenido(a), ${data.usuario.nombre || data.usuario.usuario}. Seleccione una opción de la barra de herramientas superior para comenzar.`;

                // Transición de vistas: Ocultar Login y Mostrar Dashboard
                loginSection.classList.add('hidden');
                dashboardSection.classList.remove('hidden');
            } else {
                // Mostrar mensaje de error
                alertBox.textContent = data.message || 'Credenciales incorrectas';
                alertBox.classList.remove('hidden');
                alertBox.className = 'alert alert-error';
            }
        } catch (error) {
            console.error('Error al conectar con la API:', error);
            alertBox.textContent = 'Error de conexión con el servidor.';
            alertBox.classList.remove('hidden');
            alertBox.className = 'alert alert-error';
        }
    });

    // Botón para Regresar / Cerrar Sesión
    btnLogout.addEventListener('click', () => {
        // Ocultar Dashboard y volver a mostrar Login
        dashboardSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });
>>>>>>> 9f00823b5451453efbb8ee66c13db9f1ecd5fb3d
});