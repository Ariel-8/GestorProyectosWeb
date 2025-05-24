const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');

const SECRET_KEY = 'gestorproyectos123';

// Registro de usuario
router.post('/register', async (req, res) => {
    const { nombre_usuario, correo, contrasena } = req.body;
    const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length > 0) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    await db.query(
        'INSERT INTO usuarios (nombre_usuario, correo, contrasena) VALUES (?, ?, ?)',
        [nombre_usuario, correo, hashedPassword]
    );
    res.json({ message: 'Usuario registrado exitosamente' });
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    const [rows] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    if (rows.length === 0) return res.status(400).json({ message: 'Credenciales inválidas' });

    const valido = await bcrypt.compare(contrasena, rows[0].contrasena);
    if (!valido) return res.status(400).json({ message: 'Contraseña inválida' });

    // Incluye el id y correo en el token
    const token = jwt.sign({ id: rows[0].id, correo }, SECRET_KEY, { expiresIn: '2h' });

    res.json({ token });
});

module.exports = router;