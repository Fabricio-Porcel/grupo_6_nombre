const express = require('express');
const router = express.Router();
const path = require('path');
const usersController = require('../controllers/usersController');
const fs = require('fs')

//middlewares
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const {body} = require('express-validator');
const validations = require('../middlewares/validationsMiddleware')
const validationsProfileEdit = require('../middlewares/validationsUserProfileEdit')
const {validationResult} = require('express-validator');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        
        cb(null, path.resolve(__dirname, '../../public/img/users'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});





router.get('/register' , guestMiddleware, usersController.register);

router.post('/register', upload.single('avatar'), validations, (req, res) => {
    // Verifica si hay errores de validación antes de continuar
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        // Si hay errores, elimina el archivo de la imagen subida (si existe)
        if (req.file) {
            const imagePath = path.resolve(__dirname, `../../public/img/users/${req.file.filename}`);
            fs.unlinkSync(imagePath); // Elimina el archivo
        }
        // Renderiza la vista con los errores y datos antiguos
        return res.render('users/register', {
            errors: validationErrors.mapped(),
            oldData: req.body
        });
    }
    // Llama a la función processRegister del controlador si no hay errores de validación
    usersController.processRegister(req, res);
});


router.get('/login',guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);
router.get('/profile', authMiddleware, usersController.profile);//perfil del usuario
router.get('/profileEdit/:id', authMiddleware, usersController.profileEdit);//perfil del usuario
router.put('/profileEdit/:id', authMiddleware,validationsProfileEdit, usersController.profileProcessEdit);//perfil del usuario
router.get('/logout', usersController.logout); 
router.get('/adminLogin' , usersController.adminLogin);
router.post('/admin' , usersController.admin);




module.exports = router;