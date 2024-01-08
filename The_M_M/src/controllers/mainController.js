
const express = require('express');
const fs = require('fs')
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const mainController = {
    index: (req , res) =>{
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('index' , {products})

    },
    
  
    productCart: (req , res) =>{
        res.render('productCart')
    }

};


module.exports = mainController;
