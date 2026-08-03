const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para procesar JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 IMPORTANTE: Servir todos los archivos estáticos desde la carpeta actual
app.use(express.static(__dirname));

// Ruta principal para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ejemplo de endpoint para login (ajusta con tu base de datos si aplica)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Intento de login: ${username}`);

    // Aquí ejecutas tu consulta a PostgreSQL
    res.json({ status: 'ok', message: 'Solicitud recibida' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Carpeta estática: ${__dirname}`);
    console.log(`=================================`);
});