import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/jwt.middlewares.js";



const router = Router();
//rutas publicass
router.post('/reglogin', loginController.reglogin);
router.post('/logUser', loginController.logUser);
router.get('/profile', verifyToken,loginController.profile);
 //ruta protegida
router.get('/', verifyAdmin, verifyToken, loginController.findAll)


export default router;  
