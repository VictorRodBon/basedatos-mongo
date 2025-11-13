const mongoose = require('mongoose');
require('../modelos/Usuario2'); // ← esto registra el modelo en Mongoose
require('../modelos/Peliculas');


const OpinionesSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario2',
    required: true
  },
  puntuacion: { type: Number, min: 0, max: 10, required: true },
  descripcion:{ type: String },
  pelicula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peliculas',
    required: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Opiniones', OpinionesSchema);
