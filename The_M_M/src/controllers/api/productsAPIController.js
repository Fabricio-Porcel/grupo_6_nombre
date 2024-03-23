const fs = require('fs')
const path = require('path');

const db = require("../../database/models");
const productsFilePath = path.join(__dirname, '../../data/productsDataBase.json');
const productsAPIController  = {
    'list': (req , res) =>{
    // Leer la base de datos
    //        db.Product.findAll()
    
    // Enviar los datos como respuesta al cliente
    //     .then((product)=>{
    //         return res.status(200).json({
    //             total: product.length,
    //             products:product,
    //             status:200
    //         })
    //     })
    // }

try {
    // Leer datos del archivo JSON
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    
    // Enviar los datos como respuesta al cliente
    return res.status(200).json({
        total: products.length,
        products: products,
        status: 200
    });
} catch (error) {
    console.error("Error reading products file:", error);
    return res.status(500).json({
        error: "Internal server error",
        status: 500
    });
}

}

};
module.exports = productsAPIController

