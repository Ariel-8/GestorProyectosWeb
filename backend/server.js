const express = require('express');
const morgan = require("morgan"); //Import it here
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = 3000;

app.use(morgan("tiny"));  //Use it here
app.use(cors());
app.use(express.json());
//app.use(authRoutes);
app.use('/', authRoutes);

// Definimos los endpoints públicos
app.get('/', (req, res) => {
    res.send('API Servidor con mariaDB funcionando');    
});


// ENDPOINTS DISPONIBLES PARA LAS TAREAS: -- LE AGRGAMOS SEGURIDAD 

/* ENPOINT OBTENER LAS TAREAS:
app.get('/tareas', authMiddleware, async(req, res) => {
    const [tareas] = await db.query('SELECT * FROM tareas');
    res.json(tareas);
});

// ENPOINT CREAR TAREAS:
app.post('/tareas', authMiddleware, async(req, res) => {
    if (req.body){
        const { titulo, descripcion, completa } = req.body;
        const [resultado] = await db.query('INSERT INTO tareas (titulo, descripcion, completa) VALUES (?,?,?)', [titulo, descripcion, completa]);
        res.status(201).json({ id: resultado.insertId, titulo, descripcion, completa})
    }else{
        res.json({ tipo: 'validacion', msg: 'Los datos de titulo, descripcion y estado de una tarea son obligatorios'});
    }
});

// ENPOINT PARA OBTENER UNA TAREA POR SU ID:
app.get('/tareas/:id', authMiddleware, async(req, res) => {
    const [tareas] = await db.query('SELECT * FROM tareas WHERE id = ?', [req.params.id]);
    if(tareas.length === 0) return res.status(404).json({ message: 'Tarea no encontrada en la base de datos'});
    res.json(tareas[0]);
});

// ENPOINT PARA ACTUALIZAR UNA TAREA POR SU ID:
app.put('/tareas/:id', authMiddleware, async(req, res) => {

    if (req.body){
        const { titulo, descripcion, completa } = req.body;
        
        await db.query('UPDATE tareas SET titulo = ?, descripcion = ?, completa = ? WHERE id = ?', [titulo, descripcion, completa, req.params.id]);
        res.status(200).json({ id: req.params.id, titulo: titulo, descripcion: descripcion, completa: completa });
    }else{
        res.status(404).json({ tipo: 'validacion', msg: 'Los datos de titulo, descripcion y estado de una tarea son obligatorios para la actualizacion'});
    }

});

// ENPOINT PARA ACTUALIZAR UNA TAREA POR SU ID:
app.delete('/tareas/:id', authMiddleware, async(req, res) => {

    if (req.params.id > 0){
        await db.query('DELETE FROM tareas WHERE id = ?', [req.params.id]);
        res.status(200).json({ message: 'Se eliminó la tarea con id ' + req.params.id + ' correctamente' });
    }else{
        res.status(404).json({ tipo: 'validacion', msg: 'Se requiere un ID válido para eliminar una tarea'});
    }

});**/

app.listen(port, ()=>{
    console.log('Servidor escuchando correctamente en http://localhost:', port);
});