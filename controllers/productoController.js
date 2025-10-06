const productoService = require('../services/productoService');

class ProductoController {
  async listar(req, res) {
    try {
      const productos = await productoService.obtenerTodos();
      const estadisticas = await productoService.obtenerEstadisticas();
      res.render('productos/index', { 
        productos, 
        estadisticas,
        title: 'Lista de Productos' 
      });
    } catch (error) {
      res.status(500).render('error', { 
        message: 'Error al obtener productos',
        error 
      });
    }
  }

  mostrarFormularioCrear(req, res) {
    res.render('productos/crear', { title: 'Crear Producto' });
  }

  async crear(req, res) {
    try {
      const { nombre, precio, cantidad } = req.body;
      await productoService.crear({ nombre, precio, cantidad });
      res.redirect('/productos');
    } catch (error) {
      res.status(400).render('productos/crear', {
        title: 'Crear Producto',
        error: error.message,
        producto: req.body
      });
    }
  }

  async mostrarFormularioEditar(req, res) {
    try {
      const producto = await productoService.obtenerPorId(req.params.id);
      res.render('productos/editar', { 
        producto,
        title: 'Editar Producto' 
      });
    } catch (error) {
      res.status(404).render('error', { 
        message: 'Producto no encontrado',
        error 
      });
    }
  }

  async actualizar(req, res) {
    try {
      const { nombre, precio, cantidad } = req.body;
      await productoService.actualizar(req.params.id, { nombre, precio, cantidad });
      res.redirect('/productos');
    } catch (error) {
      res.status(400).render('productos/editar', {
        title: 'Editar Producto',
        error: error.message,
        producto: { _id: req.params.id, ...req.body }
      });
    }
  }

  async eliminar(req, res) {
    try {
      await productoService.eliminar(req.params.id);
      res.redirect('/productos');
    } catch (error) {
      res.status(400).redirect('/productos');
    }
  }
}

module.exports = new ProductoController();