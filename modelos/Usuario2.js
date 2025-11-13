const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  clave: { type: String, required: true },
  estado: { type: String, required: true },
  perfil: { type: String, required: true },
  numErrores: { type: Number, required: true },
  ultimoAcceso: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario2', UsuarioSchema);
