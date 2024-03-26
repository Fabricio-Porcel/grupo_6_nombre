const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const fs = require('fs')
const productsController = require ('../controllers/productsController');
const db = require("../database/models");



//Middleware de validaciones para crear producto
const {body} = require('express-validator');
const validationsCreateProduct = require('../middlewares/validationsCreateProductMiddleware');
const {validationResult} = require('express-validator');

//Middleware de validaciones para editar producto
const validationsEditProduct = require('../middlewares/validationsEditProductMiddleware');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        
        cb(null, path.resolve(__dirname, '../../public/img/products'));
    },
    filename: function(req, file, cb) {
        // Que nombre tendran los archivos
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});


router.get("/", productsController.listProducts);
//Detalle
router.get('/Detalle-Producto/:id' , productsController.productDetail);
//Create
router.get('/Crear-Producto' , productsController.createProduct )
router.post('/Crear-Producto', upload.single("imagenProducto"), validationsCreateProduct, async (req, res) => {
    try {
        // Obtener las categorías de la base de datos
        const categories = await db.Category.findAll();
        const colours = await db.Colour.findAll();

        // Verificar las validaciones del formulario
        let validationCreateProductErrors = validationResult(req);

        if (!validationCreateProductErrors.isEmpty()) {
            // Si hay errores, elimina el archivo de la imagen subida (si existe)
            if (req.file) {
                let imagePath = path.resolve(__dirname, `../../public/img/products/${req.file.filename}`);
                fs.unlinkSync(imagePath); // Elimina el archivo
            }
            // Renderiza la vista con los errores, datos antiguos y categorías
            return res.render('products/createProduct', {
                errors: validationCreateProductErrors.mapped(),
                oldData: req.body,
                categories: categories,
                colours : colours
            });
        }
        // Llama a la función processCreate del controlador si no hay errores de validación
        productsController.processCreate(req, res);
    } catch (error) {
        console.error("Error al procesar la creación del producto:", error);
        // Manejar el error apropiadamente
        res.status(500).send("Error al procesar la creación del producto");
    }
});

// Borrar
router.delete('/eliminarProducto/:id', productsController.eliminarProducto);

//Editar
router.get('/edit/:id', productsController.edit); 
// router.put('/edit/:id', productsController.processEdit);


router.put('/edit/:id', upload.single("imagenProducto"), validationsEditProduct, async (req, res) => {
    try {
        // Obtener las categorías de la base de datos
        const categories = await db.Category.findAll();
        const colours = await db.Colour.findAll();

        console.log('Esto viene en el req.file' + req.file)

        // Verificar las validaciones del formulario
        let validationEditProductErrors = validationResult(req);

        if (!validationEditProductErrors.isEmpty()) {
            // Si hay errores, elimina el archivo de la imagen subida (si existe)
            if (req.file) {
                let imagePath = path.resolve(__dirname, `../../public/img/products/${req.file.filename}`);
                fs.unlinkSync(imagePath); // Elimina el archivo
            }
            // Renderiza la vista con los errores, datos antiguos y categorías
            return res.render('products/editarProducto', {
                errors: validationEditProductErrors.mapped(),
                oldData: req.body,
                categories: categories,
                colour : colours,
                product : req.body
            });
        }
        // Llama a la función processEdit del controlador si no hay errores de validación
        productsController.processEdit(req, res);
    } catch (error) {
        console.error("Error al procesar la edición del producto:", error);
        // Manejar el error apropiadamente
        res.status(500).send("Error al procesar la edición del producto");
    }
});


// router.patch('/edit/:id', productsController.update);
// router.get("/:id", productsController.detail);


module.exports = router;