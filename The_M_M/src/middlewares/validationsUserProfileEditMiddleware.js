const { check } = require('express-validator');

const path = require('path');



const validationsProfileEdit = [
    check('name')
    .not()
    .isLength({min:2})
    .withMessage('Debes ingresar tu Nombre'),

    check('lastName')
    .not()
    .isLength({min:2})
    .withMessage('Debes ingresar tu Apellido'),

    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email valido'),

    check('phoneNumber')
    .notEmpty()
    .isNumeric()
    .withMessage('Debes ingresar un número telefónico'),

    check('country')
    .notEmpty()
    .withMessage('Debes ingresar tu país'), 

    check('city')
    .notEmpty()
    .withMessage('Debes ingresar tu ciudad'),
];

module.exports = validationsProfileEdit;