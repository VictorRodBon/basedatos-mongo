const express = require('express');
const mongoose = require('mongoose');

const fs =require ('fs');
const path = require ('path');
const morgan = require ('morgan');

const cors=require('cors');
const rutasPeliculas = require('./rutas/rutasPeliculas');
const rutasUsuarios = require('./rutas/rutasUsuarios2');
const rutasOpiniones = require('./rutas/rutasOpiniones');

const app = express();

// Crear un stream para escribir en el archivo de log
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// Middleware de logging tipo Apache combinado
app.use(morgan('combined', { stream: logStream }));


// Permite recibir JSON en peticiones POST
app.use(express.json());

// cors
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    credentials:true
}))

// Conexión a MongoDB
mongoose.connect('mongodb://root:example@localhost:27017/2daw?authSource=admin')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar MongoDB', err));

app.use('/peliculas', rutasPeliculas);
app.use('/usuarios', rutasUsuarios);
app.use('/opiniones', rutasOpiniones);

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
