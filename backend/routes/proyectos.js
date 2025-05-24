const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const db = require('../db');

// Obtener todos los proyectos del usuario autenticado, con avance calculado
router.get('/', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const [proyectos] = await db.query(
      'SELECT * FROM proyectos WHERE usuario_id = ? AND archivado = 0',
      [usuarioId]
    );

    // Calcular avance para cada proyecto
    for (const proyecto of proyectos) {
      const [tareas] = await db.query(
        'SELECT estado FROM tareas WHERE proyecto_id = ?',
        [proyecto.id]
      );
      if (tareas.length === 0) {
        proyecto.avance = 0;
      } else {
        const completadas = tareas.filter(t => t.estado === 'completada').length;
        proyecto.avance = Math.round((completadas / tareas.length) * 100);
      }
    }

    res.json(proyectos);
  } catch (error) {
    console.error('Error al obtener los proyectos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los proyectos' });
  }
});

// Crear un nuevo proyecto
router.post('/', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { nombre, descripcion } = req.body;
    const [resultado] = await db.query(
      'INSERT INTO proyectos (usuario_id, nombre, descripcion) VALUES (?, ?, ?)',
      [usuarioId, nombre, descripcion]
    );
    res.status(201).json({ id: resultado.insertId, nombre, descripcion, avance: 0 });
  } catch (error) {
    console.error('Error al crear el proyecto:', error);
    res.status(500).json({ mensaje: 'Error al crear el proyecto' });
  }
});

// Obtener un proyecto por id (puedes agregar el avance aquí también si lo necesitas)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const proyectoId = req.params.id;
    const [proyectos] = await db.query(
      'SELECT * FROM proyectos WHERE id = ? AND usuario_id = ?',
      [proyectoId, usuarioId]
    );
    if (proyectos.length === 0) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }

    // Calcular avance para este proyecto
    const [tareas] = await db.query(
      'SELECT estado FROM tareas WHERE proyecto_id = ?',
      [proyectoId]
    );
    let avance = 0;
    if (tareas.length > 0) {
      const completadas = tareas.filter(t => t.estado === 'completada').length;
      avance = Math.round((completadas / tareas.length) * 100);
    }
    const proyecto = { ...proyectos[0], avance };

    res.json(proyecto);
  } catch (error) {
    console.error('Error al obtener el proyecto:', error);
    res.status(500).json({ mensaje: 'Error al obtener el proyecto' });
  }
});

// Eliminar un proyecto
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const proyectoId = req.params.id;
    // Verifica que el proyecto pertenezca al usuario
    const [proyectos] = await db.query(
      'SELECT * FROM proyectos WHERE id = ? AND usuario_id = ?',
      [proyectoId, usuarioId]
    );
    if (proyectos.length === 0) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    await db.query('DELETE FROM proyectos WHERE id = ?', [proyectoId]);
    res.json({ mensaje: 'Proyecto eliminado' });
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el proyecto' });
  }
});

// Actualizar un proyecto
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const proyectoId = req.params.id;
    const { nombre, descripcion } = req.body;
    // Verifica que el proyecto pertenezca al usuario
    const [proyectos] = await db.query(
      'SELECT * FROM proyectos WHERE id = ? AND usuario_id = ?',
      [proyectoId, usuarioId]
    );
    if (proyectos.length === 0) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    await db.query(
      'UPDATE proyectos SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion, proyectoId]
    );
    res.json({ mensaje: 'Proyecto actualizado' });
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el proyecto' });
  }
});

//Archivar proyecto
router.put('/:id/archivar', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const proyectoId = req.params.id;
    // Verifica que el proyecto pertenezca al usuario
    const [proyectos] = await db.query(
      'SELECT * FROM proyectos WHERE id = ? AND usuario_id = ?',
      [proyectoId, usuarioId]
    );
    if (proyectos.length === 0) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }
    await db.query(
      'UPDATE proyectos SET archivado = 1 WHERE id = ?',
      [proyectoId]
    );
    res.json({ mensaje: 'Proyecto archivado' });
  } catch (error) {
    console.error('Error al archivar el proyecto:', error);
    res.status(500).json({ mensaje: 'Error al archivar el proyecto' });
  }
});

module.exports = router;