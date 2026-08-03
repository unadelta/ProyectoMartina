document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const alertBox = document.getElementById('alert-box');
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const userWelcome = document.getElementById('user-welcome');
    const btnLogout = document.getElementById('btn-logout');

    if (loginForm) {
        loginForm.addEventListener('submit', async(e) => {
            e.preventDefault(); // Evitar el recargue de página por defecto

            const usernameInput = document.getElementById('username').value.trim();
            const passwordInput = document.getElementById('password').value.trim();

            showAlert('Verificando credenciales...', 'info');

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: usernameInput,
                        password: passwordInput
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    showAlert('¡Inicio de sesión exitoso! Redirigiendo...', 'success');

                    setTimeout(() => {
                        // Ocultar pantalla de login y mostrar dashboard
                        loginSection.classList.add('hidden');
                        dashboardSection.classList.remove('hidden');

                        if (userWelcome) {
                            userWelcome.textContent = `Bienvenido(a), ${data.usuario.nombre}. Seleccione una opción del menú para comenzar.`;
                        }
                    }, 1000);

                } else {
                    showAlert(data.message || 'Usuario o contraseña incorrectos', 'error');
                }

            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
                showAlert('Error al conectar con el servidor backend', 'error');
            }
        });
    }

    // Botón Salir / Regresar
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            dashboardSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            if (loginForm) loginForm.reset();
            hideAlert();
        });
    }

    function showAlert(message, type) {
        if (!alertBox) return;
        alertBox.textContent = message;
        alertBox.className = `alert ${type}`;
        alertBox.classList.remove('hidden');
    }

    function hideAlert() {
        if (!alertBox) return;
        alertBox.classList.add('hidden');
    }
});