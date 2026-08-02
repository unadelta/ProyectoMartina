const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Configuración de conexión a PostgreSQL (Contenedor Docker "mi-bd")
const pool = new Pool({
    user: 'usuario_una', // Usuario que definiste en PostgreSQL
    host: '127.0.0.1', // Host local mapeado por Docker
    database: 'gestion_asesores', // Nombre de la base de datos
    password: 'clave_segura', // Reemplaza por la contraseña de tu base de datos
    port: 5432, // Puerto expuesto por el contenedor mi-bd
});

// Verificación inicial de la conexión al arrancar el servidor
pool.connect((err, client, release) => {
    if (err) {
        return console.error(' Error al conectar con mi-bd:', err.stack);
    }
    console.log(' Conexión exitosa a la base de datos gestion_asesores en el contenedor mi-bd');
    release();
});

// 2. Ruta API para procesar el Login contra la base de datos
app.post('/api/login', async(req, res) => {
    const { username, password } = req.body;

    // Validación básica de campos vacíos
    if (!username || !password) {
        return res.status(400).json({
            exito: false,
            mensaje: 'Por favor, ingresa el usuario y la contraseña'
        });
    }

    try {
        // Consulta parametrizada (uso de $1 y $2 para prevenir inyección SQL)
        const queryText = 'SELECT * FROM asesores WHERE usuario = $1 AND clave = $2';
        const values = [username, password];

        const result = await pool.query(queryText, values);

        // Si la consulta devuelve al menos un registro, las credenciales son válidas
        if (result.rows.length > 0) {
            const usuarioEncontrado = result.rows[0];

            return res.json({
                exito: true,
                mensaje: 'Inicio de sesión exitoso',
                usuario: {
                    id: usuarioEncontrado.id,
                    nombre: usuarioEncontrado.nombre,
                    correo: usuarioEncontrado.correo
                }
            });
        } else {
            // Credenciales incorrectas
            return res.status(401).json({
                exito: false,
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        return res.status(500).json({
            exito: false,
            mensaje: 'Error interno en el servidor'
        });
    }
});

// Iniciar el servidor
const PUERTO = 3000;
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});