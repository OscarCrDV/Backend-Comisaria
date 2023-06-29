const { Schema, model } = require('mongoose');

const ReportePolicialOFSchema = Schema({

    fecha_hora_start: {
        type: Date,
        default: Date.now,
    },

    fecha_hora_update: {
        type: Date,
        require: false,
        default: null,
    },

    latitud: {
        type: Number,
        require: true,
    },

    longitud: {
        type: Number,
        require: true,
    },

    urbanizacion: {
        type: String,
        require: true
    },

    calle: {
        type: String,
        require: true
    },

    ciudad: {
        type: String,
        require: true
    },

    actividad_zona: {
        type: String,
        require: true
    },

    condiciones_seguridad: {
        type: String,
        require: true
    },

    descripcion_ocurrencia: {
        type: String,
        require: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

})

ReportePolicialOFSchema.method('toJSON', function() {
    const {fecha_hora_start, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('ReportePolicial', ReportePolicialOFSchema);