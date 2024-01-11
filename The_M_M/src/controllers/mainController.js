
const express = require('express');
const fs = require('fs')
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const mainController = {
    index: (req , res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        // res.render('index' , {products})
        // console.log(products)
        const featuredProducts = products.filter(product =>{
            return product.categoryProduct == "featuredProducts"
        })

        const newProducts = products.filter(product =>{
            return product.categoryProduct == "newProducts"
        })
        return res.render("index", {featuredProducts, newProducts});
    },
    
  
    productCart: (req , res) =>{
        res.render('productCart')
    }

};


module.exports = mainController;
