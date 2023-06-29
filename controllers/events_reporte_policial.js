const { response } = require('express');
const ReportePolicial = require('../models/ReportePolicial');

const getEventoReportePolicial = async (req, res = response) => {

    const reportes = await ReportePolicial.find().populate('user', 'name');

    return res.json({
        ok: true,
        reportes
    })
};

const createEventoReportePolicial = async (req, res = response) => {
    console.log(req.body);

    const reportePolicialNew = new ReportePolicial(req.body);

    console.log(reportePolicialNew);
    try {

        reportePolicialNew.user = req.uid;

        const reportePolicialSave = await reportePolicialNew.save();

        return res.json({
            ok: true,
            evento: reportePolicialSave
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const updateEventoReportePolicial = async (req, res = response) => {

    const ReportePolicialId = req.params.id;
    const uid = req.uid;

    try {

        const reporte = await ReportePolicial.findById(ReportePolicialId);

        if (!reporte) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (reporte.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoReporte = {
            ...req.body,
            user: uid
        }

        const reporteActualizado = await ReportePolicial.findByIdAndUpdate(ReportePolicialId, nuevoReporte, { new: true });

        return res.json({
            ok: true,
            reporte: reporteActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const deleteEventoReportePolicial = async (req, res = response) => {

    const ReportePolicialId = req.params.id;
    const uid = req.uid;

    try {

        const reporte = await ReportePolicial.findById(ReportePolicialId);

        if (!reporte) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (reporte.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este reporte.'
            })
        }


        await ReportePolicial.findByIdAndDelete(ReportePolicialId);

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
    getEventoReportePolicial,
    createEventoReportePolicial,
    updateEventoReportePolicial,
    deleteEventoReportePolicial
}
