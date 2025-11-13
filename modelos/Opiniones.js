const mongoose = require('mongoose');

const OpinionesSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USuario2'
  },
  puntuacion: { type: Number, min: 0, max: 10 },
  descripcion:{ type: String },
  pelicula: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Peliculas'
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Opiniones', OpinionesSchema);
