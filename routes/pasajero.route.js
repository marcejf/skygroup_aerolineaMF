import { Router } from "express";
import { PasajeroController } from "../controllers/pasajero.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post('/register', PasajeroController.register);

router.get('/list', PasajeroController.listPasajero);

router.get('/search/:id',PasajeroController.searchPasajeros);

router.delete('/delete/:id',verifyToken, verifyAdmin,PasajeroController.deletePasajero)

//ruta protegida
router.put('/update/:id', verifyToken, verifyAdmin, PasajeroController.updatePasajero);
router.patch('update/:id', verifyToken, verifyAdmin, PasajeroController.updatePasajero);


// vamos a exportar la ruta por si algo sucede
export default router;        
 
