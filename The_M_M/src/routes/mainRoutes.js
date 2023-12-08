const express = require('express');

const router = express.Router();

const mainController = require ('../controllers/mainController');

router.get('/' , mainController.index)
router.get('/Detalle-Producto' , mainController.productDetail)
router.get('/register' , mainController.register)
router.get('/login' , mainController.login)
router.get('/Carrito-de-compras' , mainController.productCart)



module.exports = router;