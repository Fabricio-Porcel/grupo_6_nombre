const express = require('express');

const router = express.Router();

const productsController = require ('../controllers/productsController');



// router.get('/Detalle-Producto' , productsController.productDetail);
router.get('/Detalle-Producto/:id' , productsController.productDetail);
router.get('/Crear-Producto' , productsController.createProduct )


module.exports = router;