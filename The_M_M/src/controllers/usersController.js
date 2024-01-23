const express = require('express');
const bcrypt = require('bcryptjs');


const usersController = {
    register: (req , res) =>{
        res.render('users/register')
    },
    login: (req , res) =>{
        res.render('users/login')
    },
    loginProcess: (req , res) =>{
        let userToLogin = User.findByField('email', req.body.email);
       // verifico si la contraseña es la que vino con el req
        if(userToLogin) {
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (passwordOk) {
                delete userToLogin.password; //esto se hace para no mantener en sesion la info de password del usuario
                req.session.userLogged = userToLogin;
                return res.redirect('users/profile');
            }
            return res.render('login', {
                errors: {
                email: {
                    msg: 'El mail o contraseña son incorrectos'
                }
            }
            
        });
    }

            return res.render('login', {
                errors: {
                email: {
                    msg: 'No se encuentra este mail en nuestra base de datos'
                }
            }
            
        });
        
    },
    profile: (req , res) =>{
       return res.render('userProfileLogin', {
       user: req.session.userLogged
       });
    },
    logout: (req , res) =>{
         req.session.destroy();
         return res.redirect('/');

    }, myProfile : (req, res) =>{
        res.render('users/myProfile')
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