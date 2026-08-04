document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const errorMessage = document.getElementById('error-message');
    const userWelcome = document.getElementById('user-welcome');
    const btnLogout = document.getElementById('btn-logout');

    // Escuchar el envío del formulario
    if (loginForm) {
        loginForm.addEventListener('submit', async(e) => {
            e.preventDefault(); // Evita que recargue la página

            const usuario = document.getElementById('usuario').value.trim();
            const clave = document.getElementById('clave').value.trim();

            errorMessage.textContent = '';

            try {
                // Petición POST al servidor backend (servidor.js)
                const respuesta = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usuario, clave })
                });

                const data = await respuesta.json();

                if (respuesta.ok && data.exito) {
                    // Ocultar pantalla de login y mostrar dashboard
                    loginSection.classList.add('hidden');
                    dashboardSection.classList.remove('hidden');

                    // Mostrar mensaje de bienvenida con el nombre retornado
                    userWelcome.textContent = `Bienvenido(a), ${data.nombre || usuario}`;
                } else {
                    errorMessage.textContent = data.mensaje || 'Usuario o contraseña incorrectos.';
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
                errorMessage.textContent = 'No se pudo conectar con el servidor. Intente de nuevo.';
            }
        });
    }

    // Botón de Cerrar Sesión
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            dashboardSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            document.getElementById('clave').value = '';
            errorMessage.textContent = '';
        });
    }
});