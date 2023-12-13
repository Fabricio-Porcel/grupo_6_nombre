const express = require('express');

const router = express.Router();

const productsController = require ('../controllers/productsController');



router.get('/Detalle-Producto' , productsController.productDetail);

module.exports = router;