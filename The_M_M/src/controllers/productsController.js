const express = require('express');


const productsController = {
    productDetail: (req , res) =>{
        res.render('productDetail')
    }
}

module.exports = productsController;