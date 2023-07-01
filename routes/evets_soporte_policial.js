
/* 
    Eventos Soportes Policiales 
    /api/Soportes_policiales
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getSoporte, createSoporte, updateSoporte, deleteSoporte } = require('../controllers/events_soporte_policial');
const { check } = require('express-validator');

//const {isDate} = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Todas tienen que pasar por la validacion de JWT
router.use(validarJWT);

//Obtener eventos
router.get('/', getSoporte);

// Crear un nuevo EventoSoportePolicial
router.post(
    '/',
    [

    ]
    , createSoporte
);

// Actualizar un EventoSoportePolicial
router.put('/:id',
    [
        [
        ]
    ]
    , updateSoporte);

// Borrar un EventoSoportePolicial
router.delete('/:id', deleteSoporte);


module.exports = router;