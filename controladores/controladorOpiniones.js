const Opinion = require('../modelos/Opiniones');

async function getOpiniones(req, res) {
    try {
        const opiniones = await Opinion.find()
            .populate('usuario', 'nombre correo')   // ← datos del usuario
            .populate('pelicula', 'title director image'); // ← datos de la película
        res.status(200).json(opiniones);
    } catch (err) {
        console.error("Error en getOpiniones:", err.message);
        res.status(500).json({ error: "Error al obtener las opiniones" });
    }
}

async function getOpinion(req, res) {
    try {
        const opinion = await Opinion.findById(req.params.id)
            .populate('usuario', 'nombre correo perfil')
            .populate('pelicula', 'title director image');

        if (!opinion) return res.status(404).json({ status: "Error opinión no encontrada" });
        res.status(200).json(opinion);
    } catch (err) {
        console.error("Error en getOpinion:", err.message);
        res.status(500).json({ status: "Error al obtener la opinión" });
    }
}

async function crearOpinion(req, res) {
    try {
        console.log('Body recibido:', req.body);
        const newOpinion = new Opinion(req.body);
        await newOpinion.save();
        res.status(201).json(newOpinion);
    } catch (err) {
        console.error("Error en crearOpinion:", err.message);
        res.status(400).json({ status: "Error al crear la opinión" });
    }
}

async function actualizarOpinion(req, res) {
    try {
        const updatedOpinion = await Opinion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedOpinion) return res.status(404).json({ status: "Error opinión no encontrada" });
        res.status(200).json(updatedOpinion);
    } catch (err) {
        console.error("Error en actualizarOpinion:", err.message);
        res.status(400).json({ status: "Error al actualizar la opinión" });
    }
}

module.exports = { getOpiniones, getOpinion, crearOpinion, actualizarOpinion };
