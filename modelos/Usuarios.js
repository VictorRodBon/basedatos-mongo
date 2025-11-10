const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String },
  favoritos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peliculas' 
  }],
  valoraciones: [{
    pelicula: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Peliculas'
    },
    puntuacion: { type: Number, min: 0, max: 10 },
    descripcion:{ type: String }
  }],
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);
