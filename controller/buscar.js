const conexion = require('../database/conexion');
const router = require('../router');

exports.select = (req, res) =>{
    const buscarc = req.body.buscarc;
    conexion.query('SELECT * FROM Customers where CustomerName = ?',[buscarc], (error, results) =>{
        if(error){
            console.log(error);
        } else{
            res.render('buscar',{results: results});
            
        }
    });
}

