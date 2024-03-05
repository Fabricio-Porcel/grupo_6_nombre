const { body } = require('express-validator');

const path = require('path');



const validationsCreateProduct = [
    body('name').notEmpty().withMessage('Debes ingresar un nombre al producto').bail()
        .isLength({min:2}).withMessage('El nombre del producto debe tener minimo 2 caracteres'), 
    body('description').notEmpty().withMessage('Debes ingresar una descripción').bail()
        .isLength({min:20}).withMessage('La descripción debe tener un minimo de 20 caracteres'), 
    
    
    body('categories').notEmpty().withMessage('Debes ingresar una categoría'), 
    body('colours').notEmpty().withMessage('Ingresa un Color para el producto'), 
    body('price').notEmpty().withMessage('Ingresa el precio del producto').bail()
        .isNumeric().withMessage('Expresa el precio en numeros'),
   
    body('imagenProducto').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif' , 'jpeg'];
       
        if (!file) {
            throw new Error('Tienes que subir una imagen para el producto');
        } else {
            let fileExtension =  path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error('La imagen tiene que ser jpg, png , jpeg o gif');
            }
        }

        return true;
    })
];

module.exports = validationsCreateProduct;