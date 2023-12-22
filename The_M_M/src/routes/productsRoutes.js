const express = require('express');

const router = express.Router();

const productsController = require ('../controllers/productsController');



// router.get('/Detalle-Producto' , productsController.productDetail);
router.get('/Detalle-Producto/:id' , productsController.productDetail);
router.get('/Crear-Producto' , productsController.createProduct )

router.get('/admin/eliminarProducto' , productsController.eliminarProducto)

router.get('/admin/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.processEdit);

module.exports = router;