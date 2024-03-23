
const express = require('express');
const fs = require('fs')
const path = require('path');
const db = require("../database/models");
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const mainController = {
    index: (req , res) =>{

        db.Product.findAll()
        .then((productos)=>{
            res.render("index", {productos})
        })
        
        // db.Product.findAll({
        //     where: {
        //         id: 8
        //     }
        // })
        // .then((productos)=>{
        //     res.render("index", {productos})
        // })


        // const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // // res.render('index' , {products})
        // // console.log(products)
        // const featuredProducts = products.filter(product =>{
        //     return product.categoryProduct == "featuredProducts"
        // })

        // const newProducts = products.filter(product =>{
        //     return product.categoryProduct == "newProducts"
        // })
        // return res.render("index", {featuredProducts, newProducts});

        // const orderBy = req.query.orderBy || 'default'; // Obtener el parámetro de orden de la solicitud (por defecto, ninguno)
    
        // // Configurar la opción de ordenamiento según el valor del parámetro orderBy
        // let orderOption;
        // switch (orderBy) {
        //     case 'mayorAMenor':
        //         orderOption = [['price', 'DESC']]; // Ordenar de mayor a menor precio
        //         break;
        //     case 'menorAMayor':
        //         orderOption = [['price', 'ASC']]; // Ordenar de menor a mayor precio
        //         break;
        //     default:
        //         orderOption = []; // No se especifica un orden específico
        // }
        
        // db.Product.findAll({
        //     order: orderOption // Aplicar la opción de ordenamiento a la consulta
        // })
        // .then(productos => {
        //     res.render("index", { productos });
        // })
        // .catch(error => {
        //     console.error('Error al recuperar productos:', error);
        //     res.status(500).send('Error interno del servidor');
        // });
    },
    mayorAMenorPrecio: (req, res) => {
        db.Product.findAll({
            order: [['price', 'DESC']] // Ordenar por precio de manera descendente (de mayor a menor)
        })
        .then(productos => {
            res.json(productos); // Devolver los productos ordenados como respuesta en formato JSON
        })
        .catch(error => {
            console.error('Error al recuperar productos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        });
    },
    
  
    productCart: (req , res) =>{
        res.render('productCart')
    }

};


module.exports = mainController;
