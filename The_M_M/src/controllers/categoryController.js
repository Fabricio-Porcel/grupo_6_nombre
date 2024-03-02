
const express = require('express');
const fs = require('fs')
const path = require('path');

const db = require("../database/models");
const categoryController = {
    listCategories: (req , res) =>{
        
        db.Category.findAll()
        .then((categories)=>{
            res.render("listCategories", {categories})
        }) 
    },
    categoryId: (req, res) => {
        db.Product.findAll({
            where: {category_id: req.params.id},
            include: [
                { association: 'categories' },
                { association: 'colours' }
            ]
        })
        .then((products)=>{
            res.render("categories/cateogria",{products})
        }) 
    }

};


module.exports = categoryController;
