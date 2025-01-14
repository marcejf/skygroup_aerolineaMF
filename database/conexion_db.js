import 'dotenv/config';
import pg from 'pg';

const { Pool} = pg;

const connectionString = process.env.DATABASE_URL;  

//probar conexion y usar try para manejo de excepciones con una promesa await ,  lo que permite hacer varias peticiones sin cerrar la base de datos
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