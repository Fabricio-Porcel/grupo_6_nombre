const express = require('express');


const usersController = {
    register: (req , res) =>{
        res.render('users/register')
    },
    login: (req , res) =>{
        res.render('users/login')
    },
    adminLogin : (req, res) =>{
        res.render('users/adminLogin')
    },
    admin : (req,res) =>{
        res.render('users/admin')
    },
    eliminarProducto :(req , res) =>{
        res.render('users/eliminarProducto')
    },
    editarProducto : (req , res) =>{
        res.render('users/editarProducto')
    }
}

module.exports = usersController;