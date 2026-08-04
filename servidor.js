const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // O la carpeta de tu frontend

// -------------------------------------------------------------
// Configuración de la Conexión a PostgreSQL (Docker)
// -------------------------------------------------------------
const pool = new Pool({
    host: '127.0.0.1', // IPv4 explícita para evitar fallos de resolución localhost en Node v17+
    port: 5432, // Puerto expuesto por el contenedor Docker
    database: 'gestion_asesores',
    user: 'usuario_una',
    password: 'clave_segura' // Contraseña real confirmada en la inspección del contenedor
});

// Captura de errores inesperados en sockets/conexiones inactivas del pool
pool.on('error', (err, client) => {
    console.error('⚠️ Error en cliente de PostgreSQL/Socket:', err.message);
});

// Prueba de conexión inicial al arrancar
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error de conexión a la base de datos:', err.stack);
    } else {
        console.log('✅ Conexión exitosa a la base de datos "gestion_asesores"');
        release();
    }
});

// -------------------------------------------------------------
// Rutas de la API / Login
// -------------------------------------------------------------
app.post('/api/login', async(req, res) => {
    const { usuario, clave } = req.body;

    try {
        const queryText = 'SELECT * FROM usuarios WHERE usuario = $1 AND clave = $2';
        const result = await pool.query(queryText, [usuario, clave]);

        if (result.rows.length > 0) {
            const userFound = result.rows[0];
            res.json({
                exito: true,
                mensaje: 'Login exitoso',
                usuario: userFound.usuario
            });
        } else {
            res.status(401).json({
                exito: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }
    } catch (error) {
        console.error('❌ Error en el endpoint /api/login:', error.message);
        res.status(500).json({ exito: false, mensaje: 'Error interno del servidor' });
    }
});

// -------------------------------------------------------------
// Inicio del Servidor
// -------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});