const express = require('express');
const router = express.Router();
const productsAPIController = require ('../../controllers/api/productsAPIController');

router.get('/' , productsAPIController.list)
router.get('/:id', productsAPIController.getProductById)
router.get('/example', productsAPIController.exampleTest)
module.exports = router;