import { Router } from "express";
import { pasajerocontroller } from "../controllers/pasajero.controller.js";

const router = Router();
router.post('/register', pasajerocontroller.register);

// vamos a exportar la ruta por si algo sucede
export default router;    
 
