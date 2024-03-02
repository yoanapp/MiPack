const conexion = require('../database/conexion');

exports.save = (req, res) =>{
    const cataname = req.body.catename;
    const note = req.body.note;
    conexion.query('INSERT INTO Categories SET ?',{CategoryName: cataname, Description:note}, (error, results) =>{
        if(error){
            console.log(error);
        } else{
            res.redirect('/views/category.ejs');
        }
    });
}

exports.guardar = (req, res) =>{
    const productname = req.body.productname;
    const pruductunit = req.body.pruductunit;
    const productcategory = req.body.productcategory;
    const productprice = req.body.productprice;
    const pruductphoto = req.body.pruductphoto;
    const productsuppliers = req.body.productsuppliers;
    conexion.query('INSERT INTO Productoss SET ?',{NombreProducto: productname,ProveedorID: productsuppliers, CategoriaID:productcategory,Unidad: pruductunit, Precio: productprice, Imagen: pruductphoto  }, (error, results) =>{
        if(error){
            console.log(error);
        } else{
            res.redirect('/views/products.ejs');
        }
    });
}