const express = require('express');
const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const db = require("../database/models");

const productsController = {
    productDetail: async (req , res)  =>{
        // const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// const singleProduct = products.find(product => {
		// 	return product.id == req.params.id
		// })
        
        // res.render('products/productDetail' , {singleProduct})
        try {
        let detalleProducto = await db.Product.findByPk(req.params.id, {
            include: [
                { association: 'categories' },
                { association: 'colours' }
            ]
           
        })
        
        res.render("products/productDetail", { product : detalleProducto});
         
        } catch  (error){
            console.error("Error al ver el detalle:", error);
            // Manejar el error apropiadamente
            res.status(500).send("Error al ver el detalle");

        }
    },
    edit: async (req,res)=>{

        try{

            let pedidoProducto = await db.Product.findByPk(req.params.id);
            let pedidoCategorias = await db.Category.findAll();
            let pedidoColores = await db.Colour.findAll()
            let coloresAsociados = await pedidoProducto.getColours();
            console.log(coloresAsociados)

            res.render("products/editarProducto", {product: pedidoProducto, categories: pedidoCategorias , colour: pedidoColores , coloresAsociados : coloresAsociados})
        } catch (error) {
            console.error("Error al cargar los colores y categorías:", error);
            res.status(500).send("Error interno del servidor");
        }




    //     Promise.all([pedidoProducto, pedidoCategorias])
    //        .then(function([producto, categorias]) {


    //        })

    //     let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    //    const modifyProduct = products.find(product =>{
    //        return product.id == req.params.id
    //    })
    //    res.render("products/editarProducto", {modifyProduct})
   },
   createProduct: async (req, res) => {
    try {
        const colours = await db.Colour.findAll({
            attributes: ['id', 'colour']
        });
        const categories = await db.Category.findAll();
        
     

    res.render("products/createProduct", { colours: colours, categories: categories });
    } catch (error) {
        console.error("Error al cargar los colores y categorías:", error);
        res.status(500).send("Error interno del servidor");
    }
},
    
processCreate: async (req, res) => {
  

    try {
        const newProduct = await db.Product.create({
            name: req.body.name,
            description: req.body.description,
            image: '/img/products/' + req.file.filename,
            price: req.body.price,
            // colour_id: req.body.colours,
            category_id: req.body.categories
        });
        let coloresProducto = req.body.colours
        await newProduct.addColours(coloresProducto);

        // Redirigir al detalle del producto recién creado
        res.redirect("/products/Detalle-Producto/" + newProduct.id);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        // Manejar el error apropiadamente
        res.status(500).send("Error al crear el producto");
    }
}
    ,
    processEdit: async (req, res) => {
        try {
            await db.Product.update({
                name: req.body.name,
                description: req.body.description,
                category_id: req.body.categoryProduct,
                price: req.body.price,
                colour_id: req.body.colours,
                image: '/img/products/' + req.file.filename
            }, {
                where: {
                    id: req.params.id
                }
            });
    
            res.redirect("/products/Detalle-Producto/" + req.params.id);
        } catch (error) {
            console.error("Error al procesar la edición del producto:", error);
            res.redirect("/"); // O maneja el error de alguna otra forma adecuada
        }
    },
    eliminarProducto: async (req, res) => {
        try {
            // Eliminar las relaciones del producto con los colores en la tabla intermedia
            await db.sequelize.query('DELETE FROM colour_product WHERE product_id = :productId', {
                replacements: { productId: req.params.id }
            });
    
            // Eliminar el producto
            await db.Product.destroy({
                where: {
                    id: req.params.id
                }
            });
    
            // Redirigir al listado de productos
            res.redirect("/products");
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
      listProducts: function(req, res){
        db.Product.findAll()
          .then(function(products) {
            res.render("products/listProducts", {products:products})
          })
      },
      detail: function(req, res){
        db.Product.findByPk(req.params.id, {
            include: [{association: "name"}, {association: "image"}]
        })
          .then(function(product) {
            res.render("productDetail", {product:product});
          })
      },
      update: function(req, res) {
        db.Product.update({
            id: products[products.length - 1].id + 1,
			name: req.body.name,
			description: req.body.description,
			image: req.file.filename,
			category: req.body.category,
			price: req.body.price,
            colour : req.body.colour,
            categoryProduct: req.body.categoryProduct
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect("/productDetail" + req.params.id)

      }
    } 



module.exports = productsController;