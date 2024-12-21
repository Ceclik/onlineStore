const Router = require('express');
const router = new Router();
const productController = require('../controllers/productsController');

router.get('/getInfo/:name', productController.getSingleProduct);
router.get('/all', productController.getAllProduct);
router.post('/add', productController.createNewProduct);
router.put('/update/:name', productController.updateExistingProduct);
router.delete('/delete/:name', productController.deleteExistingProduct);


module.exports = router;