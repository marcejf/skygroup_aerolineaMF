import 'dotenv/config';
import express from 'express';
//import { db } from './database/conexion_db.js'; //importamos la conexion
import pasajeroRouter from './routes/pasajero.route.js';
import publicRouter from './routes/public.router.js';
import loginRouter from './routes/login.route.js';
import path from 'path'
import { fileURLToPath } from 'url';
//import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get('/', (req, res) =>{
    res.redirect('/login.html');
});

//middleware de app,   app.use es middleware , le llega la info en formato express y lo convierte a json
app.use(express.static (path.join(__dirname, 'public')));
app.use(express.json()); //parsear el boddy de la peticion json
app.use(express.urlencoded({extended: true})); //permite que codifiquemoss la solicitudes
app.use('/',publicRouter);
app.use('/api/v1/pasajero', pasajeroRouter);
app.use('/api/v1/login', loginRouter);
//app.use(bodyParser.json());
//app.use('/api/v1/login', loginRouter);




//Levantar el servidor

const PORT =  process.env.PORT || 3000;

app.listen(PORT, () =>  {
    console.log(` el servidor esta escuchando en el puerto http://localhost:${PORT}`)});

 