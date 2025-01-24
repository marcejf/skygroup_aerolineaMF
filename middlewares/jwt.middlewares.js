import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if(!token) {
        return res.status(401).json({error: 'Token no proporcionado.'});
    }
    //autorizacion primera parte
    //token = token.split(' ')[1]

    if(token.startsWith('Bearer')) {
        token = token.slice(7);   //elimina el berarer incluye el espacio 
    }
    
//payload del token  cuerpo de lo que permite validar la informacion ,  con metodo next de express
    try {
        const { email, role } = jwt.verify(token, process.env.JWT_SECRET)
        req.email = email,
        req.role = role;

        next();// Continuamos con el siguiente middleware o la ruta

    } catch (error) {
        console.log(error)
        return res.status(400).json({
        error: 'Error verifying token.', error})
    }
}
//variable de verificacion del admin
export const verifyAdmin = (req, res, next) => {
    if (req.role === 'superadmin' || req.role === 'Superadmin') {
        return next()
    }
    return res.status(403).json({error: 'solo ingreso a admin a esta seccion !'})
}
