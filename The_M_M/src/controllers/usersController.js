const express = require('express');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const User = require('../modules/Users');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDatabase.json');
const fs = require('fs');

const usersController = {
    register: (req , res) =>{
        res.render('users/register')
    },
    processRegister: (req , res) =>{
        const resultsValidation = validationResult(req);
        if (resultsValidation.errors.length > 0 ){
            return res.render('users/register' , 
            {errors : resultsValidation.mapped(),
            oldData : req.body
        })
        }

        let userInDB = User.findByField('email' , req.body.email)
        if (userInDB){
            return res.render('users/register' , 
            {errors : {email:{msg: "Ya hay un usuario con este email"}},
            oldData : req.body})
        }
        // Elimino el repeatPassword para que no se almacene esa informacion
        const { repeatPassword, ...userWithoutRepeatPassword } = req.body;

        let userToCreate = {
            ...userWithoutRepeatPassword,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        let userCreated =  User.create(userToCreate)
        res.redirect('/users/profile')

       
    },
    login: (req , res) =>{
        res.render('users/login');
    },
    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        
    
        if (userToLogin) {
            // Verificar si req.body.password está definido
            if (!req.body.password) {
                return res.render('users/login', {
                    errors: {
                        password: {
                            msg: 'La contraseña es requerida'
                        }
                    }
                });
            }
    
            let passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password);
    
            if (passwordOk) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

            if(req.body.rememberUser){
                res.cookie('userEmail' , req.body.email , {maxAge : (1000 * 60) * 2})
            }
                
                return res.redirect('/users/profile');
            }
    
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'El correo o contraseña son incorrectos'
                    }
                }
            });
        }
    
        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'No se encuentra este correo en nuestra base de datos'
                }
            }
        });
    },
    profile: (req , res) => {
       return res.render('users/profile', {
       users: req.session.userLogged
       });
    },
    profileEdit: (req , res) => {
         res.render('users/profileEdit', {
        users: req.session.userLogged
        });
     },
     profileProcessEdit:(req,res)=>{
        let errors = validationResult(req);
        // res.send(errors);
        let id = req.params.id
        if (errors.isEmpty()) {
            // users: req.session.userLogged
            
           const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
           
    
           let UserToEdit = users.find(user => user.id == id)
    
           UserToEdit = {
               id:UserToEdit.id,
               name:req.body.name,
               lastName:req.body.lastName,
               country:req.body.country,
               city:req.body.city,
               email:req.body.email,
               phoneNumber:req.body.phoneNumber,
               avatar:UserToEdit.avatar,
               password:UserToEdit.password
           }
           let indice = users.findIndex(user =>{
               return user.id == id
           })
           users[indice] = UserToEdit;
    
           fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
           res.render("users/profile" ,{users: req.session.userLogged})
        }else {
             res.render("users/profileEdit" ,{users: req.session.userLogged,id: id, errors: errors.array()})
        }

     },
    logout: (req , res) =>{
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');

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