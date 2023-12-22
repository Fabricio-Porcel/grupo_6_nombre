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
    createProduct: (req , res) =>{
        res.render('products/createProduct')
    }
}

module.exports = productsController;