const {Client} = require ('pg')
const client = new Client ({
    user: 'AdminMarcela',
    host: 'localhost',
    database: 'db_aerolinea_mf',
    password: '1234567',
    port: 5432
})

 client.connect()
 .then(() => console.log('conexion exitosa !'))        
 .then(() => client.query('SELECT * FROM pasajes')) // pasajes es la tabla que quiero ver . para eso debo escribir npm test en cdm
 .then(resultado => console.table(resultado.rows))  // y se comporta como funcion ( => )pido que me haga la tabla con la informacion, que genere las columnas necesarias para mostrar la informacion
 .catch((err) => console.log(err))
 .finally(() => client.end())
 // en javascrip las promesas me sirven para mejor el tiempo de respuesta de la misma 