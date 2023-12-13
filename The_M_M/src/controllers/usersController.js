const express = require('express');


const usersController = {
    register: (req , res) =>{
        res.render('register')
    },
    login: (req , res) =>{
        res.render('login')
    },
    adminLogin : (req, res) =>{
        res.render('adminLogin')
    },
    admin : (req,res) =>{
        res.render('admin')
    },
    eliminarProducto :(req , res) =>{
        res.render('eliminarProducto')
    },
    editarProducto : (req , res) =>{
        res.render('editarProducto')
    }
}

module.exports = usersController;