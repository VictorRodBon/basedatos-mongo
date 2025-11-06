const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  premiere: { type: String },
  director: { type: String },
  short_description: { type: String },
  long_description: { type: String },
  image: { type: String },
  duration: { type: Number },
  main_actors: [{ type: String }]
});

module.exports = mongoose.model('Peliculas', PeliculaSchema);
