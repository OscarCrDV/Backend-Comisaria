
/* 
    Eventos Reportes Policiales 
    /api/reportes_policiales
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventoReportePolicial, createEventoReportePolicial, updateEventoReportePolicial, deleteEventoReportePolicial } = require('../controllers/events_reporte_policial');
const { check } = require('express-validator');

//const {isDate} = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener eventos
router.get('/', getEventoReportePolicial);

// Crear un nuevo EventoReportePolicial
router.post(
    '/',
    [
        check('urbanizacion', 'La urbanizacion es obligatoria').not().isEmpty(),
        check('calle', 'La urbanizacion es obligatoria').not().isEmpty(),
        check('ciudad', 'La urbanizacion es obligatoria').not().isEmpty(),
        check('actividad_zona', 'La urbanizacion es obligatoria').not().isEmpty(),
        check('condiciones_seguridad', 'La urbanizacion es obligatoria').not().isEmpty(),
        check('descripcion_ocurrencia', 'La urbanizacion es obligatoria').not().isEmpty(),
        check('latitud', 'La latitud es obligatoria').not().isEmpty(),
        check('longitud', 'La longitud es obligatoria').not().isEmpty(),
        validarCampos
    ]
    , createEventoReportePolicial
);

// Actualizar un EventoReportePolicial
router.put('/:id',
    [
        [
            check('urbanizacion', 'La urbanizacion es obligatoria').not().isEmpty(),
            check('calle', 'La urbanizacion es obligatoria').not().isEmpty(),
            check('ciudad', 'La urbanizacion es obligatoria').not().isEmpty(),
            check('actividad_zona', 'La urbanizacion es obligatoria').not().isEmpty(),
            check('condiciones_seguridad', 'La urbanizacion es obligatoria').not().isEmpty(),
            check('descripcion_ocurrencia', 'La urbanizacion es obligatoria').not().isEmpty(),
            check('latitud', 'La latitud es obligatoria').not().isEmpty(),
            check('longitud', 'La longitud es obligatoria').not().isEmpty(),
            validarCampos
        ]
    ]
    , updateEventoReportePolicial);

// Borrar un EventoReportePolicial
router.delete('/:id', deleteEventoReportePolicial);


module.exports = router;