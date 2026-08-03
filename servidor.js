const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del proyecto (index.html, estilos.css, script.js)
app.use(express.static(__dirname));

// Configuración de la conexión a PostgreSQL (Docker mi-bd)
const pool = new Pool({
    user: 'usuario_una',
    host: 'localhost',
    database: 'gestion_asesores',
    password: 'password_una',
    port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error al conectar con la base de datos PostgreSQL:', err.stack);
    }
    console.log('✅ Conexión exitosa a la base de datos "gestion_asesores" en el contenedor Docker mi-bd');
    release();
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta de API para el Login
app.post('/api/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        const queryText = 'SELECT * FROM asesores WHERE usuario = $1 AND clave = $2';
        const result = await pool.query(queryText, [username, password]);

        if (result.rows.length > 0) {
            const asesor = result.rows[0];
            res.json({
                success: true,
                message: 'Inicio de sesión exitoso',
                usuario: {
                    id: asesor.id,
                    nombre: asesor.nombre,
                    usuario: asesor.usuario,
                    cedula: asesor.cedula
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Usuario o contraseña incorrectos'
            });
        }
    } catch (error) {
        console.error('Error en la consulta de login:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al verificar credenciales'
        });
    }
});

app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`==================================================`);
});