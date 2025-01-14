import { Router } from "express";
import path from  "path";
import { fileURLToPath } from "url";

const router = Router();

const _dirname = import.meta.dirname;   // creo una constante donde importo el metodo meta y dirname
//eso lohago para poder borrar el html del navegador a travez de la siguiente constante
const publicPath = path.join(_dirname, "../public");  //uniendo la variable que creamos con el nombre de ese directorio


router.get('/pasajeros', (req, res) => {
    res.sendFile(publicPath, '/pasajeros.html');
})


router.get('/pasajeros', (req, res) => {
    res.sendFile();
})

export default router;

