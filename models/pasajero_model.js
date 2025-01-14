import pkg from 'body-parser';
const { text } = pkg;   

import { db } from "../database/conexion_db.js";
  // vamos a contruir la query que nos oermitira ingresar esos valores
  //parametrizando que es lo que le vamos a pedir
  //los datos se piden con signo pesos el valor del campo , para que los datos no sean manipulados de mala manera  y 
  // y brindarle seguridad a esa consulta 

const create = async (id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono1, telefono2, email) => {
  const query = {
    text: `
    INSERT INTO pasajeros (id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono1, telefono2, email) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING * 
    `,

    values: [id_pasajero, nombres, apellidos, documento, edad, pais_origen, telefono1, telefono2, email]
    //llamar los valores que le voy a pasar al pady req 
  }
  const {} = await db.query(query)
  return rows;
}

//consulta que nos perite mostrar datos q vamos  a generar
 
const  show = async (req, res) => {
  const result =  await db.query('SELECT * FROM pasajeros');
  res.json(result.rows);
}
// la manera en la que puedes buscar por correo 

const findOneByEmail = async (email) => {
  const query = {
    Text :` aSELECT * FROM pasajeros WHERE = $1
    `

  }
  const {rows} = await db.query(query, [email]);
  return rows [0];
}

export const pasajeroModel = {
  create, 
  show,
  findOneByEmail
}

