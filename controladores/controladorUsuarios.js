const Usuario= require('../modelos/Usuarios');

async function getUsuarios(req, res) {
    try {
        const usuarios = await Usuario.find()
            .populate('favoritos')
            .populate('valoraciones.pelicula');

        res.status(200).json(usuarios);
    } catch (err) {
        console.error("Error en getUsuarios:", err.message);

        res.status(500).json({ "error": "Error al obtener los usuarios" });
    }
}

async function getUsuario(req, res) {
    try {
        const usuario = await Usuario.findById(req.params.id)
            .populate('favoritos')
            .populate('valoraciones.pelicula');

        if (!usuario) {
            return res.status(404).json({ status: "Usuario no encontrado" });
        }

        res.status(200).json(usuario);
    } catch (err) {
        console.error("Error en getUsuario:", err.message);
        res.status(500).json({ status: "Error al obtener el usuario" });
    }
}


async function crearUsuario(req, res) {
    try {
        if (!req.body.nombre || !req.body.correo) {
            return res.status(400).json({ status: "Faltan campos obligatorios" });
        }
        const newUsuario = new Usuario(req.body);
        await newUsuario.save();
        res.status(201).json(newUsuario);
    } catch (err) {
        console.error("Error en crearUsuario:", err.message);
        res.status(400).json({ "status": "Error al crear el usuario" });

    }
}

async function actualizarUsuario(req, res) {
    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Para devolver el usuario actualizado
        );
        if (!updatedUsuario) return res.status(404).json({ "status": "Error usuario no encontrado" });
        res.status(200).json(updatedUsuario);
    } catch (err) {
        console.error("Error en actualizarUsuario:", err.message);
        res.status(400).json({ "status": "Error al actualizar el usuario" });
    }
}

async function eliminarUsuario(req, res) {
    try {
        const deletedUsuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!deletedUsuario) return res.status(404).json({ "status": "Error usuario no encontrado" });
        res.status(200).json({ "status": "operación realizada" });
    } catch (err) {
        console.error("Error en actualizarUsuario:", err.message);
        res.status(500).json({ "status": "Error al eliminar el usuario" });
    }
}

module.exports = { getUsuarios, getUsuario, crearUsuario, actualizarUsuario, eliminarUsuario };