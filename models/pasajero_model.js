import pkg from 'body-parser';
import { db } from "../database/conexion_db.js";
  // vamos a contruir la query que nos oermitira ingresar esos valores
  //parametrizando que es lo que le vamos a pedir
  //los datos se piden con signo pesos el valor del campo , para que los datos no sean manipulados de mala manera  y 
  // y brindarle seguridad a esa consulta 
  //en la linea inser into se debe poner tambien el squema de la tabla

  const create = async (id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono_1, telefono_2, email) => {
  const query = {
    text: `
    INSERT INTO aerolinea.pasajeros (id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono_1, telefono_2, email) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING * 
    `,
    values: [id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono_1, telefono_2, email]
    //llamar los valores que le voy a pasar al pady req 
  };

  const {rows} = await db.query(query);
  return  rows[0];
}

//read 
const readPasajero = async () => {
  const result = {
    text : `
    SELECT * FROM aerolinea.pasajeros`
  }
  const { rows } = await db.query(result);
  return rows
}

const updatePasajero = async (id_pasajero, updateFields) => {
  const setClause = Object.keys(updateFields).map((key,index ) => `${key} = $${index + 2}`).join(', ');
  const values = [id_pasajero, ...Object.values(updateFields)];

  const updateQuery = {
    text: `
    UPDATE aerolinea.pasajeros
    SET ${setClause}
    WHERE id_pasajero = $1
    RETURNING *
    `,
    values: values
  };


  try{
    const { rows }  = await db.query(updateQuery);
    if (rows.length === 0) { 
      throw new Error('pasajero no encontrado');
    }
    return rows [0];
  } catch (error) {
    console.error('error al actualizar pasajero', error);
    throw new Error ('Error al actualizar el pasajeroo');
  }
};


//buscar por email

const findOneByEmail = async (email) => {
  const query = {
      text: `
      SELECT * FROM aerolinea.pasajeros
      WHERE email = $1
      `,
      values: [email]
  }
  const {rows} = await db.query(query, [email]);
  return rows[0];
}
//Buscar por ID
const findById_pasajero = async (id_pasajero) => {
  const query = {
      text: `
      SELECT * FROM aerolinea.pasajeros
      WHERE id_pasajero= $1
      `,
      values: [id_pasajero]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

const findIdOrEmail = async (query) => {
  let queryText;
  let values;

  // Si el query es un número (id_pasajero)
  if (!isNaN(query)) {
      queryText = `
      SELECT * FROM aerolinea.pasajeros
      WHERE id_pasajero = $1`;
      values = [query];
  }
  // Si el query es un email (cadena de texto)
  else {
      queryText = `
      SELECT * FROM aerolinea.pasajeros
      WHERE email = $1`;
      values = [query];
  }
  const { rows } = await db.query({
      text: queryText,
      values: values
  });
  return rows;
}


const deletepasajero = async (id_pasajero) => {
  const deleteQuery = {
      text: `
      DELETE FROM aerolinea.pasajeros
      WHERE id_pasajero = $1
      `,
      values: [id_pasajero]
  };

  try {
      const result = await db.query(deleteQuery);
      return result.rowCount; 
   // Si la eliminación fue exitosa, podemos devolver un mensaje o un valor
  }catch (error) {
    console.error('error al eliminar pasajero', error);
      throw new Error('Error al intentar eliminar el pasajero');   
  }
};



/* const buscarPasajeroModel = async (nombres, pais_origen) => {
  try {
    // Crear la consulta base
    let query = "SELECT * FROM aerolinea.pasajeros WHERE 1=1"; // 1=1 es una técnica para facilitar la concatenación de condiciones
    const values = [];
    let paramIndex = 1; // Para manejar el índice de los parámetros

    // Agregar condiciones según los parámetros proporcionados
    if (nombres) {
      query += ` AND nombres ILIKE $${paramIndex}`; // ILIKE para búsqueda insensible a mayúsculas
      values.push(`%${nombres}%`); // Agregar el nombre con comodines para búsqueda parcial
      paramIndex++;
    }

    if (pais_origen) {
      query += ` AND pais_origen ILIKE = $${paramIndex}`; // Suponiendo que 'estado' es un campo en la tabla
      values.push(`%${pais_origen}%`);
      paramIndex++;
    }

    // Ejecutar la consulta
    const { rows } = await db.query(query, values);
    return rows; // Retornar los registros encontrados
  } catch (error) {
    throw new Error("Error al buscar aerolíneas: " + error.message);
  }
}; */
//consulta que nos perite mostrar datos q vamos  a generaren forma de filas
/*  
 const  show = async (req, res) => {
  const result =  await db.query('SELECT * FROM aerolinea.pasajeros');
  res.json(result.rows);
} */
// la manera en la que puedes buscar por correo  metood
 
export const PasajeroModel = {
  create, 
  //show,
  findOneByEmail,
  readPasajero,
  updatePasajero,
  findById_pasajero,
  findIdOrEmail,
  deletepasajero, 
  //buscarPasajeroModel

}

