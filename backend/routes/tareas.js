const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const db = require('../db');

// Crear una tarea para un proyecto
router.post('/:proyectoId/tareas', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const proyectoId = req.params.proyectoId;
    const { nombre, descripcion, estado, fecha_limite } = req.body;

    // Verifica que el proyecto pertenezca al usuario
    const [proyectos] = await db.query(
      'SELECT * FROM proyectos WHERE id = ? AND usuario_id = ?',
      [proyectoId, usuarioId]
    );
    if (proyectos.length === 0) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }

    const [resultado] = await db.query(
      'INSERT INTO tareas (proyecto_id, nombre, descripcion, estado, fecha_limite) VALUES (?, ?, ?, ?, ?)',
      [proyectoId, nombre, descripcion, estado, fecha_limite]
    );
    res.status(201).json({ id: resultado.insertId, nombre, descripcion, estado, fecha_limite });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ mensaje: 'Error al crear la tarea' });
  }
});

// Obtener todas las tareas de un proyecto
router.get('/:proyectoId/tareas', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const proyectoId = req.params.proyectoId;

    // Verifica que el proyecto pertenezca al usuario
    const [proyectos] = await db.query(
      'SELECT * FROM proyectos WHERE id = ? AND usuario_id = ?',
      [proyectoId, usuarioId]
    );
    if (proyectos.length === 0) {
      return res.status(404).json({ mensaje: 'Proyecto no encontrado' });
    }

    const [tareas] = await db.query(
      'SELECT * FROM tareas WHERE proyecto_id = ?',
      [proyectoId]
    );
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ mensaje: 'Error al obtener las tareas' });
  }
});

// Actualizar el estado de una tarea
router.put('/tarea/:tareaId', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const tareaId = req.params.tareaId;
    const { estado } = req.body;

    // Verifica que la tarea pertenezca a un proyecto del usuario
    const [tareas] = await db.query(
      `SELECT t.* FROM tareas t
       JOIN proyectos p ON t.proyecto_id = p.id
       WHERE t.id = ? AND p.usuario_id = ?`,
      [tareaId, usuarioId]
    );
    if (tareas.length === 0) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    await db.query(
      'UPDATE tareas SET estado = ? WHERE id = ?',
      [estado, tareaId]
    );
    res.json({ mensaje: 'Estado de la tarea actualizado' });
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la tarea' });
  }
});

// Eliminar una tarea
router.delete('/tarea/:tareaId', authMiddleware, async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const tareaId = req.params.tareaId;
    // Verifica que la tarea pertenezca a un proyecto del usuario
    const [tareas] = await db.query(
      `SELECT t.* FROM tareas t
       JOIN proyectos p ON t.proyecto_id = p.id
       WHERE t.id = ? AND p.usuario_id = ?`,
      [tareaId, usuarioId]
    );
    if (tareas.length === 0) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    await db.query('DELETE FROM tareas WHERE id = ?', [tareaId]);
    res.json({ mensaje: 'Tarea eliminada' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la tarea' });
  }
});

module.exports = router;