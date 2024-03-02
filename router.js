const express = require('express');
const router = express.Router();
const conexion = require('./database/conexion');


router.get('/', (req, res) =>{
    res.render('index');
});

///Mostras Tablas
router.get('/views/category.ejs', (req, res) =>{

    conexion.query('SELECT * FROM Categorias', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('category',{results: results});
        } 

    }) 
});

router.get('/views/customers.ejs', (req, res) =>{

    conexion.query('SELECT * FROM Clientes', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('customers',{results: results});
        } 

    })  
});

router.get('/views/orders.ejs', (req, res) =>{

    const query = 'SELECT * FROM Ordenes';
    const query2 = 'SELECT c.NombreCliente FROM Orders o LEFT JOIN Clientes c on c.ClienteID = o.ClienteID '; 

    conexion.query(query + ';'+ query2 ,[1,2], (error, results) => {

        if (error) {
            throw error;
        } else {
            const ordersResults = results[0] ;
            const categoriesResults = results[1] ;
            res.render('orders', { ordersResults: ordersResults, categoriesResults: categoriesResults });
        }

    }); 
});
router.get('/views/orderdetails.ejs', (req, res) =>{

    conexion.query('SELECT * FROM DetallesOrdenes', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('orderdetails',{results: results});
        } 

    })  
});
router.get('/views/employees.ejs', (req, res) =>{

    conexion.query('SELECT * FROM Empleados', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('employees',{results: results});
        } 

    })  
});
router.get('/views/suppliers.ejs', (req, res) =>{

    conexion.query('SELECT * FROM Proveedores', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('suppliers',{results: results});
        } 

    })  
});
router.get('/views/shippers.ejs', (req, res) =>{

    conexion.query('SELECT * FROM Repartidores', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('shippers',{results: results});
        } 

    })  
});

router.get('/views/products.ejs', (req, res) =>{

    const query1 = 'SELECT * FROM Productoss ORDER BY NombreProducto';
    const query2 = 'SELECT DISTINCT NombreCategoria FROM Categorias '; 
    const query3 = 'SELECT DISTINCT NombreProveedor FROM Proveedores ';

    conexion.query(query1 + ';'+ query2 + ';'+ query3,[1,2,3], (error, results) => {

        if (error) {
            throw error;
        } else {
            const productsResults = results[0] ;
            const categoriesResults = results[1] ;
            const suppliersResults = results[2] ;
            res.render('products', { productsResults: productsResults, categoriesResults: categoriesResults, suppliersResults:suppliersResults });
        }

    });
});  

router.get('/views/create.ejs', (req, res)=>{
    res.render('create');
});

router.get('/view/edit.ejs/:id', (req, res)=>{
    const id = req.params.CategoryID;
    conexion.query('SELECT * FROM Categoria WHERE CategoriaID =?', [id], (error,results) =>{

        if(error){
            throw error;
        }else {
            res.render('edit',{categorid: results[0]});
        }
    })
});

router.get('/delete/:CategoryID', (req, res)=>{
    const CategoryID = req.params.CategoryID;
    conexion.query('DELETE FROM Categoria WHERE CategoriaID = ?', [CategoryID], (error,results)=>{
        if(error){
            throw error;
        } else{
            res.redirect('/views/category.ejs');
        }
    })

})

//Mostrar productos por categorias
 router.get('/views/pages/beverages.ejs', (req, res) =>{

    conexion.query('SELECT * FROM product_beverages', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('pages/beverages',{results: results});
        } 

    })  
});

router.get('/views/pages/cereals.ejs', (req, res) =>{

    conexion.query('SELECT * FROM product_cereals', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('pages/cereals',{results: results});
        } 

    })  
});
router.get('/views/pages/condiments.ejs', (req, res) =>{

    conexion.query('SELECT * FROM product_condiment', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('pages/condiments',{results: results});
        } 

    })  
});
router.get('/views/pages/confections.ejs', (req, res) =>{

    conexion.query('SELECT * FROM product_confection', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('pages/confections',{results: results});
        } 

    })  
});
router.get('/views/pages/dairyproducts.ejs', (req, res) =>{

    conexion.query('SELECT * FROM product_dairyproducts', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('pages/dairyproducts',{results: results});
        } 

    })  
});
router.get('/views/pages/meat.ejs', (req, res) =>{

    conexion.query('SELECT * FROM product_meat', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('pages/meat',{results: results});
        } 

    })  
});
router.get('/views/pages/produce.ejs', (req, res) =>{

    conexion.query('SELECT * FROM product_produce', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('pages/produce',{results: results});
        } 

    })  
});
router.get('/views/pages/seafood.ejs', (req, res) =>{

    conexion.query('SELECT * FROM product_seafood', (error,results) =>{

        if(error){throw error;
        }else {
            res.render('pages/seafood',{results: results});
        } 

    })  
});
/////////


const crud = require('./controller/crud');
router.post('/save', crud.save)

const buscar = require('./controller/buscar');
router.post('/select', buscar.select)

const guardar = require('./controller/crud');
router.post('/guardar', crud.guardar)

module.exports = router;