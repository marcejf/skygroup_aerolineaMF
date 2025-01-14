import { pasajeroModel } from "../models/pasajero_model.js"; 

//esto es lo que vamos a concatenar cuando hagamos la consulta 
// asi localhost:3000/api/v1/pasajero/register     en postman
//api/v1/pasajero/register   
const register = async ( req, res) => {
    try {
        console.log("Cuerpo recibido:", req.body);
        const {id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono_1, telefono_2, email} = req.body; 

     // || representa la condicional o" estamos pidiendo que si ese campo esta vacio 
    if(!id_pasajero || !nombres || !apellidos || !documento || !edad || !pais_origen || !telefono_1 || !telefono_2 || !email)
        // en caso de que no se cumpla me retorne un mensaje de error tipo json 
        return res.status(400).json({ok:false,message: "Faltan campos"} );
    
     
    const pasajero = await pasajeroModel.findOneByEmail(email);
    if(pasajero){
        return res.status(409).json({ok:false, message:"el cliente ya existe"});
    }
      return res.status(201).json({
        ok: true,
        message:" Cliente creado con Exito",

    })

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            message:"Error al crear El cliente"
        })
    }  
}


/* export const pasajerocontroller = {
    register: (req, res) => {
      res.status(200).send("Registro exitoso");
    },
  }; */
  
// ya hemos contruido el client model, ahora vamos a contruir el client controller
// api/v1/pasajero/show
export const pasajerocontroller =  {
    register
}


