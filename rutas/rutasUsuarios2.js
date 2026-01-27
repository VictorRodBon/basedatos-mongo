const express = require('express');
const router = express.Router();
const ControladorUsuarios = require('../controladores/controladorUsuarios2');
const { validarRegistro, validarLogin } = require('../util/validateUsuarios.js');

const upload = require('../middleware/upload');


router.post('/registro', [validarRegistro, ControladorUsuarios.usuarioRegistro]);
router.post('/login', ControladorUsuarios.usuarioLogin);
router.post('/logout', ControladorUsuarios.usuarioLogout);

router.put('/foto/:id', upload.single('foto'), ControladorUsuarios.actualizarFoto);

router.get('/perfil', ControladorUsuarios.getPerfil);

module.exports = router;