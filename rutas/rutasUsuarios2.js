const express = require('express');
const router = express.Router();
const ControladorUsuarios = require('../controladores/controladorUsuarios2');
const { validarRegistro, validarLogin } = require('../utils/validateUsuarios.js');

router.post('/registro', [validarRegistro, ControladorUsuarios.usuarioRegistro]);
router.post('/login', ControladorUsuarios.usuarioLogin);
router.post('/logout', ControladorUsuarios.usuarioLogout);
router.get('/perfil', ControladorUsuarios.getPerfil);

module.exports = router;