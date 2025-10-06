require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const productoController = require('./controllers/productoController');
const usuarioController = require('./controllers/usuarioController');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    multiply: (a, b) => {
      const num1 = parseFloat(a) || 0;
      const num2 = parseFloat(b) || 0;
      return (num1 * num2).toFixed(2);
    }
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
app.get('/', (req, res) => res.redirect('/productos'));
app.get('/productos', productoController.listar);
app.get('/productos/nuevo', productoController.mostrarFormularioCrear);
app.post('/productos', productoController.crear);
app.get('/productos/:id/editar', productoController.mostrarFormularioEditar);
app.put('/productos/:id', productoController.actualizar);
app.delete('/productos/:id', productoController.eliminar);

// Rutas de Usuarios
app.get('/usuarios', usuarioController.listar);
app.get('/usuarios/nuevo', usuarioController.mostrarFormularioCrear);
app.post('/usuarios', usuarioController.crear);
app.get('/usuarios/:id/editar', usuarioController.mostrarFormularioEditar);
app.put('/usuarios/:id', usuarioController.actualizar);
app.delete('/usuarios/:id', usuarioController.eliminar);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});