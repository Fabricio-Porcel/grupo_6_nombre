const express = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const db = require("../database/models");

const productsController = {
    productDetail: (req , res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const singleProduct = products.find(product => {
			return product.id == req.params.id
		})
        
        res.render('products/productDetail' , {singleProduct})
    },
    edit:(req,res)=>{
        let pedidoProducto = db.Product.findByPk(req.params.id);
        let pedidoCategorias = db.Category.findAll();
        Promise.all([pedidoProducto, pedidoCategorias])
           .then(function([producto, categorias]) {
            res.render("edit", {producto:producto, categorias:categorias})


           })

        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
       const modifyProduct = products.find(product =>{
           return product.id == req.params.id
       })
       res.render("products/editarProducto", {modifyProduct})
   },
    createProduct: (req , res) =>{
        db.Product.findAll()
          .then(function(products) {
            return res.render("creatProduct", {products:products});

    }),

    res.render('products/createProduct')
},
    processCreate : (req , res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // Crear el objeto literal (producto) a sumar al array
		db.newProduct.create({
            // id: products[products.length - 1].id + 1,
			name: req.body.name,
			description: req.body.description,
			image: req.file.filename,
			price: req.body.price,
            colour_id: req.body.colours,
            category_id: req.body.categories
			
		});
		// Pushear el objeto literal al array
		// products.push(newProduct);

		// Transformar a json y Sobreescribir el archivo JSON
		// fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

		// Mostrarle al usuario una vista (index)
		res.redirect("/products/Detalle-Producto/" + newProduct.id);

    },
    processEdit:(req,res)=>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const id = req.params.id;
        let productToEdit = products.find(product => product.id == id)

        productToEdit = {
            id: productToEdit.id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            colour_id: req.body.colour,
            image: productToEdit.image,
            category_id: req.body.categoryProduct
        }

        let indice = products.findIndex(product =>{
            return product.id == id
        })

        // Remplazamos
        products[indice] = productToEdit
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
        
        res.redirect("/")
    },
    eliminarProducto: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id

            }
        })

        res.redirect("/productDetail");

        const productId = parseInt(req.params.id); // Asumiendo que usas un parámetro en la URL para el ID del producto a eliminar
        
        // Leer el archivo de productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        
      
        // Filtrar los productos, excluyendo el que se va a eliminar
        const productsActualizado = products.filter(product => product.id !== productId);
       
      
        // Guardar los productos actualizados en el archivo
        fs.writeFileSync(productsFilePath, JSON.stringify(productsActualizado, null, 2), 'utf-8');
      
        // Redirigir o enviar una respuesta según sea necesario
        res.redirect('/'); // Cambia esto según tus necesidades
      },
      listProducts: function(req, res){
        db.productsDatabase.findAll()
          .the(function(products) {
            res.render("listProducts", {products:products})
          })
      },
      detail: function(req, res){
        db.productsDatabase.findByPk(req.params.id, {
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