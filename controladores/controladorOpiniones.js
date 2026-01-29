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
        //console.log('Body recibido:', req.body);
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
async function borrarOpinion(req, res) {
    try {
        const deleteOpinion = await Opinion.findByIdAndDelete(req.params.id);
        if (!deleteOpinion) return res.status(404).json({ "status": "Error: Monitor no encontrado" });
        res.status(200).json({ "status": "operación realizada" });
    } catch (err) {
        console.error("Error en eliminarOpinion:", err.message);
        res.status(500).json({ "status": "Error al eliminar una opinion" });
    }
}

async function agruparOpiniones(req, res) {
    try {
        const { desde, hasta } = req.query;

        if (!desde || !hasta) {
            return res.status(400).json({ status: "Error", mensaje: "Debes enviar los parámetros 'desde' y 'hasta'" });
        }

        const inicio = new Date(desde);
        const fin = new Date(hasta);

        const resultado = await Opinion.aggregate([
            {
                $match: {
                    fechaRegistro: {
                        $gte: inicio,
                        $lte: fin
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateFromParts: {
                            year: { $year: "$fechaRegistro" },
                            month: { $month: "$fechaRegistro" },
                            day: { $dayOfMonth: "$fechaRegistro" }
                        }
                    },
                    total: { $sum: 1 }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        res.status(200).json(resultado);

    } catch (err) {
        console.error("Error al obtener las opiniones por fecha:", err);
        res.status(500).json({ status: "Error al obtener opiniones por fecha" });
    }
}


module.exports = { getOpiniones, getOpinion, crearOpinion, actualizarOpinion, agruparOpiniones };
