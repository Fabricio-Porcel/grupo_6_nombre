const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/register' , usersController.register);

router.get('/login' , usersController.login);
router.get('/adminLogin' , usersController.adminLogin);
router.post('/admin' , usersController.admin);
router.get('/admin/editarProducto' , usersController.editarProducto);
router.get('/admin/eliminarProducto' , usersController.eliminarProducto);



module.exports = router;