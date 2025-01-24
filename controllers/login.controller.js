import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/login.model.js';
//http://localhost:3000/api/v1/login/regUser
const reglogin = async (req, res) =>{
    try{
        console.log(req.body)
        const { email, password, role  } = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({
            ok: false, 
            message : 'faltan campos'});        
        }
        const login = await UserModel.findOneByEmail(email);
        if (login){
            return res.status(400).json({
            ok: true,
            message: 'el usuario ya existe' 
            });
        }

        //encriptacion de contraseña mas robusta
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = await UserModel.createUser({ email, password: hashedPassword, role });
        
        const token = jwt.sign({ email: newUser.email, role: newUser.role },
            process.env.JWT_SECRET,
            {
                expiresIn: '1000h',
            }
        );

        return res.status(201).json({
            ok: true,
            message:{
                token,
                role: newUser.role
            },
        });
    }catch (error){
        console.log(error)
        return res.status(500).json({
        message :'Error serveer'
        });
    }
    
}

// ruta /api/v1/login/logUser
const logUser = async (req, res) => {
    console.log('datos recibidos', req.body);
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
                error: 'camposs requeridos !!'});
        }
        // busca un email  para ver si el usuario existe
        const user = await UserModel.findOneByEmail(email);
        if(!user) {
            return res.status(400).json({ 
            error: 'Usuario no existe!!' });
        }
        //compara contraseña
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ error: 'contraseña incorrecta!!' });
        }

        const token = jwt.sign({ email: user.email, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: '1000h',
            }
        );

        return res.json({ ok: true,
            message: {
            token,
            email: user.email,
            role: user.role,
        },
    });

    }catch (error){
        console.log(error)
        return res.status(500).json({ 
        ok: false,
        message: 'error al crear el usuario' 
    });

    }
}

const profile = async (req, res) => {
    try {
        const user = await UserModel.findOneByEmail(req.email)
        return res.json({
        ok: true,
        message: user,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
        ok: false,
        message: 'Error del servidor' 
        });
    }
}

const findAll = async (req, res) => {
    try {
        const users = await UserModel.showUser(req.email)
        return res.json({ok: true,
        message: users,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ 
        ok: false,
        message: 'Error de servidor' 
        });
    }
}

export const loginController = {
    reglogin,
    logUser,
    findAll,
    profile
}