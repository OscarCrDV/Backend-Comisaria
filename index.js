const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//directorio publico
app.use( express.static('public') );


//Lectura y parseo del body
app.use( express.json() );


//Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/reportes_policiales', require('./routes/events_reporte_policial') );


//Escuchar peticiones
app.listen ( process.env.PORT, () => {
    console.log(`Servidor Corriendo en puerto ${ process.env.PORT }`);
} ) 