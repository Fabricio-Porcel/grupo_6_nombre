
const express = require('express');
const fs = require('fs')
const path = require('path');

const db = require("../database/models");
const categoryController = {
    listCategory: (req , res) =>{
        
        db.Category.findAll()
        .then((category)=>{
            res.render("category", {category})
        }) 
    }

};


module.exports = categoryController;
