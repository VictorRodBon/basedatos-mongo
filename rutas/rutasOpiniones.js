const express = require('express');
const router = express.Router();
const ControladorOpiniones = require('../controladores/controladorOpiniones');

router.get('/', ControladorOpiniones.getOpiniones);
router.get('/consulta/:id', ControladorOpiniones.getOpinion);
router.post('/', ControladorOpiniones.crearOpinion);
router.put('/:id', ControladorOpiniones.actualizarOpinion);
router.get('/estadisticas',ControladorOpiniones.agruparOpiniones);
module.exports = router;