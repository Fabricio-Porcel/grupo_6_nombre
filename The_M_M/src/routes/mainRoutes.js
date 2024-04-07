const express = require('express');

const router = express.Router();

const mainController = require ('../controllers/mainController');

router.get('/' , mainController.index)


router.get('/Carrito-de-compras' , mainController.productCart)

router.get('/nosotros', mainController.nosotros)



module.exports = router;