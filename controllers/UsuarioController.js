const usuarioService = require('../services/usuarioService');

class UsuarioController {
  async listar(req, res) {
    try {
      const usuarios = await usuarioService.obtenerTodos();
      
      // Formatear usuarios
      const usuariosFormateados = usuarios.map(u => ({
        _id: u._id ? u._id.toString() : '',
        username: u.username || '',
        correo: u.correo || '',
        // No enviamos el password a la vista por seguridad
        createdAt: u.createdAt
      }));
      
      const estadisticas = await usuarioService.obtenerEstadisticas();
      res.render('usuarios/index', { 
        usuarios: usuariosFormateados, 
        estadisticas,
        title: 'Lista de Usuarios' 
      });
    } catch (error) {
      console.error('Error al listar usuarios:', error);
      res.status(500).render('error', { 
        message: 'Error al obtener usuarios',
        error 
      });
    }
  }

  mostrarFormularioCrear(req, res) {
    res.render('usuarios/crear', { title: 'Crear Usuario' });
  }

  async crear(req, res) {
    try {
      const { username, password, correo } = req.body;
      
      const usuarioData = {
        username: username ? username.trim() : '',
        password: password || '',
        correo: correo ? correo.trim().toLowerCase() : ''
      };
      
      console.log('Creando usuario:', { ...usuarioData, password: '***' });
      
      await usuarioService.crear(usuarioData);
      res.redirect('/usuarios');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(400).render('usuarios/crear', {
        title: 'Crear Usuario',
        error: error.message,
        usuario: req.body
      });
    }
  }

  async mostrarFormularioEditar(req, res) {
    try {
      const usuario = await usuarioService.obtenerPorId(req.params.id);
      res.render('usuarios/editar', { 
        usuario: {
          _id: usuario._id.toString(),
          username: usuario.username,
          correo: usuario.correo,
          password: usuario.password
        },
        title: 'Editar Usuario' 
      });
    } catch (error) {
      res.status(404).render('error', { 
        message: 'Usuario no encontrado',
        error 
      });
    }
  }

  async actualizar(req, res) {
    try {
      const { username, password, correo } = req.body;
      
      const usuarioData = {
        username: username ? username.trim() : '',
        password: password || '',
        correo: correo ? correo.trim().toLowerCase() : ''
      };
      
      await usuarioService.actualizar(req.params.id, usuarioData);
      res.redirect('/usuarios');
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.status(400).render('usuarios/editar', {
        title: 'Editar Usuario',
        error: error.message,
        usuario: { _id: req.params.id, ...req.body }
      });
    }
  }

  async eliminar(req, res) {
    try {
      await usuarioService.eliminar(req.params.id);
      res.redirect('/usuarios');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.status(400).redirect('/usuarios');
    }
  }
}

module.exports = new UsuarioController();