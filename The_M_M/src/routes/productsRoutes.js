const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const productsController = require ('../controllers/productsController');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        
        cb(null, path.resolve(__dirname, '../../public/img'));
    },
    filename: function(req, file, cb) {
        // Que nombre tendran los archivos
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});


router.get('/Detalle-Producto/:id' , productsController.productDetail);

router.get('/Crear-Producto' , productsController.createProduct )
router.post('/Crear-Producto', upload.single("imagenProducto") , productsController.processCreate);

router.delete('/admin/eliminarProducto' , productsController.eliminarProducto);

router.get('/admin/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.processEdit);

module.exports = router;