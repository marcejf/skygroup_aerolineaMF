
import { Router } from "express";
import path from  "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);   // creo una constante donde importo el metodo meta y dirname
//eso lohago para poder borrar el html del navegador a travez de la siguiente constante
/* const publicPath = path.join(_dirname, "../public");  //uniendo la variable que creamos con el nombre de ese directorio
 */
//ruta login
router.get('/', (req, res) =>{
    res.sendFile(path.join(_dirname, '../public/login.html'));
})

// index
router.get('/index', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/index.html'));  // Envía el archivo al navegador
});

//aeropuertos
router.get('/Aeropuertos', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/Aeropuertos.html'));
});

router.get('/aviones', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/aviones.html'));
});

router.get('/equipaje', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/equipaje.html'));
});

router.get('/facturas', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/facturas.html'));
});
router.get('/pagos', (req, res) => {
    res.sendFile(path.join(_dirname, '../public//pagos.html'));
});

router.get('/pasajes', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/pasajes.html'));
});

router.get('/pasajeros', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/pasajeros.html'));  // Envía el archivo al navegador
});

router.get('/proveedores', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/proveedores.html'));
});

router.get('/reservas', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/reservas.html'));
});

router.get('/vuelo', (req, res) => {
    res.sendFile(path.join(_dirname, '../public/vuelos.html'));
});

router.get('/img', (req,res) =>{
    res.sendFile(path.join)
})





export default router;


