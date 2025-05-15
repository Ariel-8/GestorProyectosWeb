const mysql = require('mysql2/promise'); //Importación de mysql para la conexión a la base de datos

const pool = mysql.createPool({ //Creación de la conexión a la base de datos

    host: 'localhost', //Host de la base de datos
    user: 'root', //Usuario de la base de datos
    password: '', //Contraseña de la base de datos, si no cuenta con contraseña dejarla el espacio en blanco
    database: 'gestor_proyectos', //Nombre de la base de datos
    waitForConnections: true, //Esperar conexiones
    connectionLimit: 10, //Límite de conexiones
    queueLimit: 0, //Límite de cola de conexiones

}); //Configuración de la conexión a la base de datos

module.exports = pool;