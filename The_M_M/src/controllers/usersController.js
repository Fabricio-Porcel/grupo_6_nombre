const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
// const User = require('../modules/Users');

const db = require('../database/models');

const path = require('path');
const usersFilePath = path.join(__dirname, '../data/usersDatabase.json');
const fs = require('fs');

const usersController = {
    register: (req, res) => {
        res.render('users/register')
    },
    processRegister: async (req, res) => {
        try {
            const resultsValidation = validationResult(req);
            if (resultsValidation.errors.length > 0) {
                return res.render('users/register', {
                    errors: resultsValidation.mapped(),
                    oldData: req.body
                });
            }

            const userInDB = await db.User.findOne({ where: { email: req.body.email } });
            if (userInDB) {
                return res.render('users/register', {
                    errors: { email: { msg: "Ya hay un usuario con este email" } },
                    oldData: req.body
                });
            }

            // Elimino el repeatPassword para que no se almacene esa información
            const { repeatPassword, ...userWithoutRepeatPassword } = req.body;

            const userToCreate = {
                ...userWithoutRepeatPassword,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file.filename
            };

            const userCreated = await db.User.create(userToCreate);
            res.redirect('/users/profile');
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    login: (req, res) => {
        res.render('users/login');
    },
    loginProcess: async (req, res) => {
        try {

            const userToLogin = await db.User.findOne({ where: { email: req.body.email } });
            if (!userToLogin) {
                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'No se encuentra este correo en nuestra base de datos'
                        }
                    }
                });
            }

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

            const passwordOk = bcrypt.compareSync(req.body.password, userToLogin.password);

            if (!passwordOk) {
                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'El correo o contraseña son incorrectos'
                        }
                    }
                });
            }

            delete userToLogin.password;
            req.session.userLogged = userToLogin;

            if (req.body.rememberUser) {
                res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 30 });
            }

            return res.redirect('/users/profile');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
    ,
    profile: (req, res) => {

        return res.render('users/profile', {
            users: req.session.userLogged
        });
    },
    profileEdit: async (req, res) => {
        try {
            // Obtener el usuario actual desde la base de datos utilizando el ID de usuario almacenado en la sesión
            const user = await db.User.findByPk(req.session.userLogged.id);
            console.log('el usuario tiene un id ' + req.session.userLogged.id)

            if (!user) {
                return res.status(404).send('Usuario no encontrado');
            }

            res.render('users/profileEdit', { users: user });
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    profileProcessEdit: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render("users/profileEdit", {
                    user: req.session.userLogged,
                    id: req.params.id,
                    errors: errors.array()
                });
            }

            // Obtener el ID del usuario a editar desde los parámetros de la URL
            const userId = req.params.id;

            // Obtener el usuario a editar desde la base de datos
            const userToUpdate = await db.User.findByPk(userId);
            if (!userToUpdate) {
                return res.status(404).send('Usuario no encontrado');
            }

            // Actualizar los datos del usuario con los nuevos datos del formulario
            await userToUpdate.update({
                name: req.body.name,
                lastName: req.body.lastName,
                country: req.body.country,
                city: req.body.city,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber
                // No actualices el avatar o la contraseña aquí, a menos que permitas cambiarlos en este formulario
            });

            // Redirigir al perfil del usuario actualizado
            res.redirect("/users/profile");
        } catch (error) {
            console.error('Error al procesar la edición del perfil:', error);
            res.status(500).send('Error interno del servidor');
        }
    }
    ,
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');

    },
    delete: async (req, res) => {
        try {
            const userId = req.params.id;
    
            // Eliminar la imagen asociada al usuario si existe
            const user = await db.User.findByPk(userId);
            if (user && user.avatar) {
                const imagePath = path.resolve(__dirname, `../../public/img/users/${user.avatar}`);
                fs.unlinkSync(imagePath);
            }
    
            // Eliminar el usuario de la base de datos
            await db.User.destroy({ where: { id: userId } });
    
            // Eliminar las cookies y la sesión
            res.clearCookie('userEmail');
            req.session.destroy();
    
            // Redirigir al usuario a alguna página de confirmación o inicio
            res.redirect('/');
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            res.status(500).send('Error interno del servidor');
        }
    },

    adminLogin: (req, res) => {
        res.render('users/adminLogin')
    },
    admin: (req, res) => {
        res.render('users/admin')
    },
    eliminarProducto: (req, res) => {
        res.render('users/eliminarProducto')
    },
    editarProducto: (req, res) => {
        res.render('users/editarProducto')
    }
}

module.exports = usersController;