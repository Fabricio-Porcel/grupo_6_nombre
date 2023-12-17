const express = require('express');


const productsController = {
    productDetail: (req , res) =>{
        res.render('products/productDetail')
    }
}

module.exports = productsController;