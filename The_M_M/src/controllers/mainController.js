
const express = require('express');



const mainController = {
    index: (req , res) =>{

        res.render('index')

    },
    
  
    productCart: (req , res) =>{
        res.render('productCart')
    }

};


module.exports = mainController;
