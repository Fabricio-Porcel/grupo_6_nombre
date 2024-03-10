const express = require('express');

const router = express.Router();

const categoryController = require ('../controllers/categoryController');



router.get('/' , categoryController.listCategories)
router.get('/:id' , categoryController.categoryId)



module.exports = router;