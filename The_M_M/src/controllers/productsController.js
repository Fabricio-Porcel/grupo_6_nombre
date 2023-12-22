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
       console.log(req.params.id);
       console.log(modifyProduct);
       res.render("editarProducto", {modifyProduct})
   },
    createProduct: (req , res) =>{
        res.render('products/createProduct')
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
            image: productToEdit.image
        }

        let indice = products.findIndex(product =>{
            return product.id == id
        })

        // Remplazamos
        products[indice] = productToEdit
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "))
        
        res.redirect("/")
    }
}

module.exports = productsController;