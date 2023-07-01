const { Schema, model } = require('mongoose');

const SoporteSchema = Schema({

    fecha_hora_start: {
        type: Date,
        default: Date.now,
    },

    fecha_hora_update: {
        type: Date,
        require: false,
        default: null,
    },

    asunto: {
        type: String,
        require: true,
    },

    descripcion: {
        type: String,
        require: true,
    },

    tipo_problema: {
        type: String,
        require: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

})

SoporteSchema.method('toJSON', function() {
    const {fecha_hora_start, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Soporte', SoporteSchema);