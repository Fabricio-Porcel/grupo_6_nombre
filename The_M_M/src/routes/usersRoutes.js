const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

//middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/register' , guestMiddleware, usersController.register);
router.get('/login' ,guestMiddleware, usersController.login);
router.post('/login' , usersController.loginProcess);
router.get('/profile', authMiddleware, usersController.profile);//perfil del usuario
router.get('/logout', usersController.logout); 
router.get('/adminLogin' , usersController.adminLogin);
router.post('/admin' , usersController.admin);

router.get('/myProfile', usersController.myProfile)



module.exports = router;