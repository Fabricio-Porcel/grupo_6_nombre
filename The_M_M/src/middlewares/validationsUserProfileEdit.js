const { body } = require('express-validator');

const path = require('path');

const validationsProfileEdit = [
    body('name')
    .notEmpty()
    .withMessage('Debes ingresar tu Nombre'),

    body('lastName')
    .notEmpty()
    .withMessage('Debes ingresar tu Apellido'),

    body('email')
    .isEmail()
    .withMessage('Debes ingresar un email valido'),

    body('phoneNumber')
    .isNumeric()
    .withMessage('Debes ingresar un número telefónico'),

    body('country')
    .notEmpty()
    .withMessage('Debes ingresar tu país'), 

    body('city')
    .notEmpty()
    .withMessage('Debes ingresar tu ciudad'),
];

module.exports = validationsProfileEdit;