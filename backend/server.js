const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const proyectosRoutes = require('./routes/proyectos');
const tareasRoutes = require('./routes/tareas');

const app = express();
const port = 3000;

// --- Middlewares globales ---
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// --- Rutas públicas ---
app.use('/auth', authRoutes); // /auth/login y /auth/register

// Ruta de prueba pública
app.get('/', (req, res) => {
  res.send('API Server funcionando');
});

// --- Rutas protegidas ---
app.use('/api/proyectos', authMiddleware, proyectosRoutes);
app.use('/api/proyectos', authMiddleware, tareasRoutes);

// Ejemplo de ruta protegida
app.get('/profile', authMiddleware, async (req, res) => {
  res.json({ message: 'Ruta protegida', user: req.user });
});

// --- Manejo de errores global (opcional) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});