import { PasajeroModel } from "../models/pasajero_model.js"; 

//esto es lo que vamos a concatenar cuando hagamos la consulta 
// asi localhost:3000/api/v1/pasajero/register     en postman
//api/v1/pasajero/register   
const register = async ( req, res) => {
    try {
        console.log("Cuerpo recibido:", req.body);
        const {id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono_1, telefono_2, email} = req.body; 

     // || representa la condicional o" estamos pidiendo que si ese campo esta vacio 
    if(!id_pasajero || !nombres || !apellidos || !documento || !edad || !pais_origen || !telefono_1 || !telefono_2 || !email){ 
        // en caso de que no se cumpla me retorne un mensaje de error tipo json 
        return res.status(400).json({ok:false,message: "Faltan campos"} );
    }
     //condicionarlo para que sea el idcliente
    const pasajero = await PasajeroModel.findOneByEmail(email);
    if(pasajero){
        return res.status(409).json({ok:false, message:"el cliente ya existe"});
    } 
    
    const newpasajero = await PasajeroModel.create(id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono_1, telefono_2, email);
    return res.status(201).json({
        ok: true,
        message : newpasajero
    })
//activar en caso de que no funcione   
}
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            message:"Error al crear El cliente"
        })
    }  
}

// http://localhost:3000/api/v1/pasajero/list
const listPasajero = async (req, res) => {
    try { 
        const pasajeros = await PasajeroModel.readPasajero();
        res.json(pasajeros);
    } catch (error) {
        res.status(500).json({ message : 'error al obtener la lista de pasajeros'});
    }
};

const searchPasajeros = async (req, res) => {
    const { id }  = req.params;

    if(!id ){
        return res.status(400).json({
            ok: false,
            message:'se requiere un parametro de busqueda'
        })
    }

    try{
        const pasajeros = await PasajeroModel.findIdOrEmail(id);

        if (pasajeros.length === 0) {
            return res.status(404).json({
              ok: false,
              message: 'No se encontró ningún pasajero con el criterio proporcionado'
            });
        }

        return res.status(200).json({
            ok: true,
            data: pasajeros
        });

    } catch  (error) {
        console.error(error)
        return res.status(500).json({
            ok: false,  
            message : 'Error serverr'
        })

    }
}

// http://localhost:3000/api/v1/pasajero/deletePsajero

const  deletePasajero  =  async (req, res) => {
    const { id } = req.params;
    const userRole = req.role;

    if(userRole !== 'Superamin' && userRole !== 'superadmin') {
        return res.status(403).json({
            ok: false,
            message : 'no tienes permisos para eliminar pasajeros'
        });
    }
    try{
        const deleteRows = await PasajeroModel.deletepasajero(id);
        if (deleteRows === 0) {
            return res.status(404).json({
                ok: false, 
                message :'no se encontro pasajero'
            });
        }
        return res.status(200).json({
            ok:true,
            message : 'pasajero eliminando correctamente'
        });

        } catch (error){
        console.error(error);
        return res.status(500).json({
            ok: false,
            message : 'error al eliminar el pasajero'
        });
    }
}

const updatePasajero = async (req, res) => {
    const { id_pasajero } = req.params;
    const updateFields = req.body;
    if (Object.keys(updateFields).length === 0){
        return res.status(400).json({
            ok: false,
            message: 'no se proporcionan campos para actualizar'

        });
    }

    try{
        const updatePasajero = await PasajeroModel.updatePasajero(id_pasajero, updateFields);
        return res.status(200).json({
            ok: true,
            message : 'pasajero actualizado correctamente',
            data: updatePasajero
        });
    } catch (error){
        console.error('Error al actualizar pasajero',error.message);
        return res.status(500).json({
            ok: false,
            message : 'error al actualizar el pasajero'
        });
    }
};

/* const buscarPasajeros = async (req, res) => {
    const { nombres, pais_origen } = req.query; // Obtener parámetros de búsqueda de la consulta
  
    try {
      const pasajero = await pasajeroModel.buscarPasajeroModel(nombres, pais_origen);
      return res.status(200).json({
        message: "Búsqueda realizada con éxito",
        data: pasajero
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al buscar pasajeros",
        error: error.message
      });
    }
  };
 */
// ya hemos contruido el client model, ahora vamos a contruir el client controller
// api/v1/pasajero/show
export const PasajeroController =  {
    register,
    listPasajero,
    searchPasajeros,
    deletePasajero,
    updatePasajero,
    //buscarPasajeros
}




