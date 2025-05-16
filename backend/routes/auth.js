const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db');

const SECRET_KEY = 'samuelito123';

// Definimos los metodos para base dedatos
router.post('/register', async(req, res) => {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users where email = ?', [email]);
    if(rows.length > 0) return res.status(400).json({message: 'El usuario ya existe'});

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('insert into users (email, password) values (?, ?)', [email, hashedPassword]);
    res.json({message: 'Usuario registrado exitosamente'});
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users where email = ?', [email]);
    if(rows.length === 0) return res.status(400).json({message: 'Credenciales inválidas'});

    const valido = await bcrypt.compare(password, rows[0].password);
    if(!valido) return res.status(400).json({message: 'Password inválido'});
    
    const token = jwt.sign({email}, SECRET_KEY, {expiresIn: '2h'});

    res.json({token});
});

module.exports = router;