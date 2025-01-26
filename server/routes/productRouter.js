const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const productSearchSortController = require('../controllers/productSearchSortController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/getOne/:id', productController.getSingleProduct);
router.get('/all', productController.getAllProduct);
router.post('/add', authMiddleware, checkRoleMiddleware('ADMIN'), productController.addNewProduct);
router.put('/update/:id', checkRoleMiddleware('ADMIN'), productController.updateExistingProduct);
router.delete('/delete/:id', checkRoleMiddleware('ADMIN'), productController.deleteExistingProduct);
router.post('/addToCart/:productId', authMiddleware, productController.addProductToCart);
router.delete('/deleteFromCart/:productId', authMiddleware, productController.deleteProductFromCart);
router.post('/addRating/:productId', authMiddleware, productController.addRating);
router.delete('/deleteRating/:productId', authMiddleware, productController.deleteRating);
router.get('/nameSearch', productSearchSortController.nameSearch);
router.get('/producerNameSort', productSearchSortController.producerNameSort);
router.get('/typeSort', productSearchSortController.typeSort);
router.get('/priceSort', productSearchSortController.priceSort);

module.exports = router;
