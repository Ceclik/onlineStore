const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getOne/:id', productController.getSingleProduct);
router.get('/all', productController.getAllProduct);
router.post('/add', checkRoleMiddleware('ADMIN'), productController.addNewProduct);
router.put('/update/:id', checkRoleMiddleware('ADMIN'), productController.updateExistingProduct);
router.delete('/delete/:id', checkRoleMiddleware('ADMIN'), productController.deleteExistingProduct);
router.post('/addToCart/:productId', authMiddleware, productController.addProductToCart);
router.delete('/deleteFromCart/:productId', authMiddleware, productController.deleteProductFromCart);

module.exports = router;