const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El username es obligatorio'],
    unique: true,
    trim: true,
    minlength: [3, 'El username debe tener al menos 3 caracteres']
  },
  password: {
    type: String,
    required: [true, 'El password es obligatorio'],
    minlength: [6, 'El password debe tener al menos 6 caracteres']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un correo válido']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);