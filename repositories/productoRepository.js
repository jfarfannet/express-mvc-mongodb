const Producto = require('../models/Producto');

class ProductoRepository {
  async findAll() {
    return await Producto.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Producto.findById(id);
  }

  async create(productoData) {
    const producto = new Producto(productoData);
    return await producto.save();
  }

  async update(id, productoData) {
    return await Producto.findByIdAndUpdate(
      id,
      productoData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Producto.findByIdAndDelete(id);
  }

  async count() {
    return await Producto.countDocuments();
  }
}

module.exports = new ProductoRepository();