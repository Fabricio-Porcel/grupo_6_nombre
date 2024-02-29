const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const productsController = require ('../controllers/productsController');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        
        cb(null, path.resolve(__dirname, '../../public/img/products'));
    },
    filename: function(req, file, cb) {
        // Que nombre tendran los archivos
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({storage: storage});


router.get("/", productsController.listProducts);
//Detalle
router.get('/Detalle-Producto/:id' , productsController.productDetail);
//Create
router.get('/Crear-Producto' , productsController.createProduct )
router.post('/Crear-Producto', upload.single("imagenProducto") , productsController.processCreate);
// Borrar
router.delete('/eliminarProducto/:id', productsController.eliminarProducto);
//Editar
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.processEdit);


// router.patch('/edit/:id', productsController.update);
// router.get("/:id", productsController.detail);


module.exports = router;