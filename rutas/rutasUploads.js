// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/imagen', upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }

  const ruta = `/uploads/${req.file.filename}`;

  // Aquí llamas a tu función que guarda la ruta en la BD
  // await guardarImagenEnBD(ruta);

  res.json({
    mensaje: 'Imagen subida correctamente',
    ruta
  });
});

module.exports = router;
