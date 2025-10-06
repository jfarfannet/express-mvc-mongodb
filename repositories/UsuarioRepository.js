const Usuario = require('../models/Usuario');

class UsuarioRepository {
  async findAll() {
    return await Usuario.find().sort({ createdAt: -1 }).lean();
  }

  async findById(id) {
    return await Usuario.findById(id).lean();
  }

  async findByUsername(username) {
    return await Usuario.findOne({ username }).lean();
  }

  async findByCorreo(correo) {
    return await Usuario.findOne({ correo }).lean();
  }

  async create(usuarioData) {
    const usuario = new Usuario(usuarioData);
    return await usuario.save();
  }

  async update(id, usuarioData) {
    return await Usuario.findByIdAndUpdate(
      id,
      usuarioData,
      { new: true, runValidators: true }
    ).lean();
  }

  async delete(id) {
    return await Usuario.findByIdAndDelete(id).lean();
  }

  async count() {
    return await Usuario.countDocuments();
  }
}

module.exports = new UsuarioRepository();