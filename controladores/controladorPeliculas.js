const Pelicula = require('../modelos/Peliculas');

async function getPeliculas(req, res) {
    try {
        const peliculas = await Pelicula.find();
        res.status(200).json(peliculas);
    } catch (err) {
        console.error("Error en getPeliculas:", err.message);

        res.status(500).json({ "error": "Error al obtener los peliculas" });
    }
}

async function getPelicula(req, res) {
    try {
        const pelicula = await Pelicula.findById(req.params.id);
        if (!pelicula) return res.status(404).json({ "status": "Error pelicula no encontrado" });
        res.status(200).json(pelicula);
    } catch (err) {
        console.error("Error en getPelicula:", err.message);
        res.status(500).json({ "status": "Error al obtener el pelicula" });

    }
}

async function crearPelicula(req, res) {
    try {
        const { title, premiere, director, short_description, long_description, image, duration, main_actors } = req.body;
        
        // Validación básica
        if (!title) {
            return res.status(400).json({ message: 'El título es obligatorio' });
        }

        // Crear instancia del modelo
        const nuevaPelicula = new Pelicula({
            title,
            premiere,
            director,
            short_description,
            long_description,
            image,
            duration,
            main_actors
        });

        // Guardar en la base de datos
        await nuevaPelicula.save();

        res.status(201).json({
            message: 'Película creada correctamente',
            pelicula: nuevaPelicula
        });
    } catch (error) {
        console.error('Error al crear película:', error);
        res.status(500).json({ message: 'Error interno al crear película', error });
    }
};

async function actualizarPelicula(req, res) {
    try {
        const updatedPelicula = await Pelicula.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Para devolver el pelicula actualizado
        );
        if (!updatedPelicula) return res.status(404).json({ "status": "Error pelicula no encontrado" });
        res.status(200).json(updatedPelicula);
    } catch (err) {
        console.error("Error en actualizarPelicula:", err.message);
        res.status(400).json({ "status": "Error al actualizar el pelicula" });
    }
}

async function eliminarPelicula(req, res) {
    try {
        const deletedPelicula = await Pelicula.findByIdAndDelete(req.params.id);
        if (!deletedPelicula) return res.status(404).json({ "status": "Error pelicula no encontrado" });
        res.status(200).json({ "status": "operación realizada" });
    } catch (err) {
        console.error("Error en actualizarPelicula:", err.message);
        res.status(500).json({ "status": "Error al eliminar el pelicula" });
    }
}

module.exports = { getPeliculas, getPelicula, crearPelicula, actualizarPelicula, eliminarPelicula };