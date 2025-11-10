const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const rutasPeliculas = require('./rutas/rutasPeliculas');
const rutasUsuarios = require('./rutas/rutasUsuarios');

const app = express();
// Permite recibir JSON en peticiones POST
app.use(express.json());

// cors
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials:true
}))

// Conexión a MongoDB
mongoose.connect('mongodb://root:example@localhost:27017/2daw?authSource=admin')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB', err));

app.use('/peliculas', rutasPeliculas);
app.use('/usuarios', rutasUsuarios);

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));