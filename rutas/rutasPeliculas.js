const express = require('express');
const router = express.Router();
const ControladorPeliculas = require('../controladores/controladorPeliculas');

router.get('/', ControladorPeliculas.getPeliculas);
router.get('/:id', ControladorPeliculas.getPelicula);
router.post('/', ControladorPeliculas.crearPelicula);
router.put('/:id', ControladorPeliculas.actualizarPelicula);
router.delete('/:id', ControladorPeliculas.eliminarPelicula);
module.exports = router;