const express = require('express');
const router = express.Router();
const ControladorUsuarios = require('../controladores/controladorUsuarios');

router.get('/', ControladorUsuarios.getUsuarios);
router.get('/:id', ControladorUsuarios.getUsuario);
router.post('/', ControladorUsuarios.crearUsuario);
router.put('/:id', ControladorUsuarios.actualizarUsuario);
router.delete('/:id', ControladorUsuarios.eliminarUsuario);
module.exports = router;