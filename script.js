document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const alertBox = document.getElementById('alert-box');
    const forgotPasswordLink = document.getElementById('forgot-password');

    // Evento de envío del formulario
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita la recarga de la página

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Validación básica de campos vacíos
        if (username === '' || password === '') {
            showAlert('Por favor, complete todos los campos.', 'error');
            return;
        }

        // Simulación de autenticación
        // Nota: Aquí realizarías la petición 'fetch()' a tu servidor o API
        if (username === 'admin' && password === '123456') {
            showAlert('¡Inicio de sesión exitoso! Redirigiendo...', 'success');

            setTimeout(() => {
                // Redirección al panel del sistema de gestión
                // window.location.href = 'dashboard.html';
                console.log('Usuario autenticado correctamente.');
            }, 1500);
        } else {
            showAlert('Usuario o contraseña incorrectos.', 'error');
        }
    });

    // Manejo del enlace de recuperación de clave
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Contacte al administrador del sistema UNA para restablecer su clave.');
    });

    // Función para mostrar mensajes de alerta
    function showAlert(message, type) {
        alertBox.textContent = message;
        alertBox.className = 'alert'; // Limpia clases previas

        if (type === 'error') {
            alertBox.classList.add('alert-error');
        } else if (type === 'success') {
            alertBox.classList.add('alert-success');
        }

        alertBox.classList.remove('hidden');
    }
});