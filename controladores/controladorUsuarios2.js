const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario2 = require('../modelos/Usuario2.js');
const { validationResult } = require('express-validator');

// Clave secreta para JWT (en producción usar variable de entorno)
const SECRET_KEY = 'clave_super_secreta'; // process.env.SECRET_KEY

// Registro de usuario
const usuarioRegistro = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  try {
    const { codigo, nombre, correo, clave } = req.body;

    // Verificar si ya existe
    const existingUsuario = await Usuario2.findOne({ correo });
    if (existingUsuario) return res.status(400).json({ message: 'El usuario ya existe' });

    // Cifrar contraseña
    const hashedPassword = await bcrypt.hash(clave, 10);

    // Crear usuario
    const nuevoUsuario = new Usuario2({
      codigo,
      nombre,
      correo,
      clave: hashedPassword,
      estado: "activo",
      perfil: "usuario",
      numErrores: 0,
      ultimoAcceso: new Date() // opcional, ya tiene default
    });

    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error });
  }
};

// Login
const usuarioLogin = async (req, res) => {
  try {
    const { correo, clave } = req.body;

    // Buscar usuario
    const usuario = await Usuario2.findOne({ correo });
    if (!usuario) return res.status(401).json({ message: 'Usuario no encontrado' });

    // Verificar contraseña
    const isMatch = await bcrypt.compare(clave, usuario.clave);
    if (!isMatch) return res.status(401).json({ message: 'Usuario o clave incorrecta' });

    // Crear token JWT
    const token = jwt.sign({ id: usuario._id, correo: usuario.correo }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login correcto', token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
};

// Logout
const usuarioLogout = (req, res) => {
  res.json({ message: 'Logout correcto' });
};

// Perfil protegido
const getPerfil = (req, res) => {
  try {
    const authHeader = req.headers['authorization']; // Authorization: Bearer <token>
    if (!authHeader) return res.status(401).json({ message: 'No autenticado' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No autenticado' });

    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: 'Perfil del usuario', usuario: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = {
  usuarioRegistro,
  usuarioLogin,
  usuarioLogout,
  getPerfil
};
