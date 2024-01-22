const express = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const productsController = {
    productDetail: (req , res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		const singleProduct = products.find(product => {
			return product.id == req.params.id
		})
        
        res.render('products/productDetail' , {singleProduct})
    },
    edit:(req,res)=>{
        let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
       const modifyProduct = products.find(product =>{
           return product.id == req.params.id
       })
       res.render("products/editarProducto", {modifyProduct})
   },
    createProduct: (req , res) =>{
        res.render('products/createProduct')
    },
    processCreate : (req , res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // Crear el objeto literal (producto) a sumar al array
		const newProduct = {
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			description: req.body.description,
			image: req.file.filename,
			category: req.body.category,
			price: req.body.price,
            colour : req.body.colour,
            categoryProduct: req.body.categoryProduct
			
		}
		// Pushear el objeto literal al array
		products.push(newProduct);

		// Transformar a json y Sobreescribir el archivo JSON
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));

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
            category: req.body.category,
            description: req.body.description,
            colour: req.body.colour,
            image: productToEdit.image,
            categoryProduct: req.body.categoryProduct
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
        const productId = req.params.id; // Asumiendo que usas un parámetro en la URL para el ID del producto a eliminar
      
        // Leer el archivo de productos
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
      
        // Filtrar los productos, excluyendo el que se va a eliminar
        const productsActualizado = products.filter(product => product.id !== productId);
      
        // Guardar los productos actualizados en el archivo
        fs.writeFileSync(productsFilePath, JSON.stringify(productsActualizado, null, 2), 'utf-8');
      
        // Redirigir o enviar una respuesta según sea necesario
        res.redirect('/'); // Cambia esto según tus necesidades
      }
}

module.exports = productsController;