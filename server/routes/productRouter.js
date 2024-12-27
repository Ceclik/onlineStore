const Router = require('express');
const router = new Router();
const productController = require('../controllers/productsController');

router.get('/getOne/:id', productController.getSingleProduct);
router.get('/all', productController.getAllProduct);
router.post('/add', productController.addNewProduct);
router.put('/update/:name', productController.updateExistingProduct);
router.delete('/delete/:name', productController.deleteExistingProduct);


module.exports = router;