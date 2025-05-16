const mysql = require('mysql2/promise') // Importa el módulo con soporte para promesas

const pool = mysql.createPool({
    host: 'localhost',          // Dirección del servidor MySQL
    port: 3307,                 // Puerto (comúnmente es 3306, pero usas 3307)
    user: 'root',               // Usuario
    password: '',          // Contraseña
    database: 'gestor_proyectos',         // Base de datos a la que te conectarás
    waitForConnections: true,
    connectionLimit: 10,        // Máximo de conexiones simultáneas
    queueLimit: 0               // Sin límite en la cola de espera
});

module.exports = pool; // Exporta el pool para usarlo en otros archivos