const productoRepository = require('../repositories/productoRepository');

class ProductoService {
  async obtenerTodos() {
    return await productoRepository.findAll();
  }

  async obtenerPorId(id) {
    const producto = await productoRepository.findById(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return producto;
  }

  async crear(productoData) {
    // Validaciones de negocio adicionales si es necesario
    if (productoData.precio < 0) {
      throw new Error('El precio no puede ser negativo');
    }
    if (productoData.cantidad < 0) {
      throw new Error('La cantidad no puede ser negativa');
    }
    return await productoRepository.create(productoData);
  }

  async actualizar(id, productoData) {
    const producto = await productoRepository.findById(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return await productoRepository.update(id, productoData);
  }

  async eliminar(id) {
    const producto = await productoRepository.findById(id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return await productoRepository.delete(id);
  }

  async obtenerEstadisticas() {
    const productos = await productoRepository.findAll();
    const total = productos.length;
    const valorTotal = productos.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    return { total, valorTotal };
  }
}

module.exports = new ProductoService();