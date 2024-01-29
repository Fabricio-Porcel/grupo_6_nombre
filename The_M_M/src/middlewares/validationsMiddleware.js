const { body } = require('express-validator');

const path = require('path');



const validations = [
    body('name').notEmpty().withMessage('Debes ingresar tu Nombre'), 
    body('lastName').notEmpty().withMessage('Debes ingresar tu Apellido'), 
    body('email').notEmpty().withMessage('Debes ingresar un email').bail()
        .isEmail().withMessage('Debes ingresar formato de email valido'),
    body('password').notEmpty().withMessage('Ingresa una contraseña'), 
    body('repeatPassword').notEmpty().withMessage('Repite la contraseña')
        .custom((repeatedPassword, { req }) => {
            if (repeatedPassword !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    body('phoneNumber').notEmpty().withMessage('Debes ingresar un número telefónico'), 
    body('country').notEmpty().withMessage('Ingresa tu país'), 
    body('city').notEmpty().withMessage('Ingresa tu ciudad'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
       
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension =  path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('La imagen tiene que ser jpg, png o gif');
            }
        }

        return true;
    })
];

module.exports = validations;