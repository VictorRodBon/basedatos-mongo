const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  clave: { type: String, requierd: true },
  estado: { type: String, requierd: true },
  perfil: { type: String, requierd: true },
  numErrores: { type: Number, required: true },
  ultimoAcceso: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
