const usuarioRepository = require('../repositories/usuarioRepository');

class UsuarioService {
  async obtenerTodos() {
    return await usuarioRepository.findAll();
  }

  async obtenerPorId(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return usuario;
  }

  async crear(usuarioData) {
    // Validar que el username no exista
    const usuarioExistente = await usuarioRepository.findByUsername(usuarioData.username);
    if (usuarioExistente) {
      throw new Error('El username ya está en uso');
    }

    // Validar que el correo no exista
    const correoExistente = await usuarioRepository.findByCorreo(usuarioData.correo);
    if (correoExistente) {
      throw new Error('El correo ya está registrado');
    }

    // Validaciones adicionales
    if (usuarioData.password.length < 6) {
      throw new Error('El password debe tener al menos 6 caracteres');
    }

    return await usuarioRepository.create(usuarioData);
  }

  async actualizar(id, usuarioData) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Validar username único (excepto el actual)
    if (usuarioData.username !== usuario.username) {
      const usuarioExistente = await usuarioRepository.findByUsername(usuarioData.username);
      if (usuarioExistente) {
        throw new Error('El username ya está en uso');
      }
    }

    // Validar correo único (excepto el actual)
    if (usuarioData.correo !== usuario.correo) {
      const correoExistente = await usuarioRepository.findByCorreo(usuarioData.correo);
      if (correoExistente) {
        throw new Error('El correo ya está registrado');
      }
    }

    return await usuarioRepository.update(id, usuarioData);
  }

  async eliminar(id) {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }
    return await usuarioRepository.delete(id);
  }

  async obtenerEstadisticas() {
    const usuarios = await usuarioRepository.findAll();
    const total = usuarios.length;
    return { total };
  }
}

module.exports = new UsuarioService();