const {Client} = require ('pg')
const client = new Client ({
    user: 'AdminMarcela',
    host: 'localhost',
    database: 'db_aerolinea_mf',
    password: '1234567',
    port: 5432
})
execute()
async function  execute(){
    try{
        await ClientRequest.connect()
        console.log('conexiòn exitosa')
        const result = await client.query('SELECT * FROM pasajeros')
        console.table(result.rows) // que me traiga la infirmacion como tabla 
    }
    catch (Error){  // manejo del error 
        console.error(`Algo ha sucedido ${Error}`)// me permite personalizar el error el console.error

    }
    finally{
        await client.end()
        console.log ('cierre de conexiòn exitosa')
    }
} 

// si no funciona este bloque de codigo y solo testea el de la carpeta conexion.js
//comentar el bloque de codigo y luego poner este en esa carpera conexion y cambiar el nombre de la base de datos para que genere error 