const { response } = require('express');
const Soporte = require('../models/SoportePolicial');

const getSoporte = async (req, res = response) => {

    const soportes = await Soporte.find().populate('user', 'name');

    return res.json({
        ok: true,
        soportes
    })
};

const createSoporte = async (req, res = response) => {
    console.log(req.body);

    const soporteNew = new Soporte(req.body);

    console.log(soporteNew);
    try {

        soporteNew.user = req.uid;

        const soporteSave = await soporteNew.save();

        return res.json({
            ok: true,
            evento: soporteSave
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const updateSoporte = async (req, res = response) => {

    const SoportePolicialId = req.params.id;
    const uid = req.uid;

    try {

        const soporte = await Soporte.findById(SoportePolicialId);

        if (!soporte) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (soporte.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoSoporte = {
            ...req.body,
            user: uid
        }

        const soporteActualizado = await Soporte.findByIdAndUpdate(SoportePolicialId, nuevoSoporte, { new: true });

        return res.json({
            ok: true,
            soporte: soporteActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const deleteSoporte= async (req, res = response) => {

   
    const SoportePolicialId = req.params.id;
    const uid = req.uid;

    try {

        const soporte = await Soporte.findById(SoportePolicialId);

        if (!soporte) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (soporte.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este soporte.'
            })
        }


        await Soporte.findByIdAndDelete(SoportePolicialId);

        return res.json({ ok: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    getSoporte,
    createSoporte,
    updateSoporte,
    deleteSoporte
}
