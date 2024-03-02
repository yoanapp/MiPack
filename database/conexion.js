var mysql2 = require('mysql2');

var conexion = mysql2.createConnection({
    multipleStatements: true,
    host: 'localhost',
    database: 'bd_libreria',
    user: 'root',
    password: '12345678*',
    port: '3306'
});

conexion.connect( function(error){
    if(error){
        throw error;
    }else{
        console.log('conexion Exitosa');
    }

});

conexion.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Se perdió la conexión con la base de datos');
      } else {
        console.error('Error en la conexión con la base de datos: ', err);
      }
    });

module.exports = conexion;