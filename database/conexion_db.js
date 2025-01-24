import 'dotenv/config';
import pg from 'pg';

const { Pool} = pg; //esto permitira tener varias conexiones a la vez
 
// DATABASE_URL = "postgressql=//postgres:AdminMarcela:1234567@localhost:5432/de_aerolinea_mf" 

const connectionString = process.env.DATABASE_URL;  ///variable de entorno

//probar conexion y usar try para manejo de excepciones con una promesa await ,  lo que permite hacer varias peticiones sin cerrar la base de datos
//la siguente es una variable de conexion y la llamos db
export const db = new Pool ({
    allowExitOnIdle: true,
    connectionString
});

(async() =>{ 
    
try {
    const result = await db.query ('SELECT NOW()'); //seleccione todo ahora  consulta de prueba 
    console.log("conexion exitosa:", result.rows [0]);

} catch (error){
    console.error('error al conectar la base de Datos', error);
}
})();