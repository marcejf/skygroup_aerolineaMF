import express from 'express';
import { db } from './database/conexion_db.js'; //importamos la conexion
import 'dotenv/config';
import pasajeroRouter from './routes/pasajero.route.js';
const app = express();

//ruta raiz

/* app.get('/', (req,res) => { 
    res.send('hello world')
}); 

esto se activa antes de empezar a ver la base de datos de nuestro interes*/

// ruta para probar la conexion a la base de Datoss 

app.get('/db-status', async (req, res) =>  {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({ status: 'conexion exitosa', time: result.rows[0] });
    }catch (error) {
        console.error('error al consultar la base de datoss ', error);
        res.status(500).json({status: 'error en la conexion', error: error.message});
    }
}); 


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/v1/pasajero', pasajeroRouter);
//Levantar el servidor

const PORT =  process.env.PORT || 3000;
app.listen(PORT, () =>  {
    console.log(` el servidor esta escuchando en el puerto ${PORT}`);});

 