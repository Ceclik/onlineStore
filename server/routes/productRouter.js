const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const productSearchSortController = require('../controllers/productSearchSortController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/all', productController.getAllProducts);
router.post('/add', authMiddleware, checkRoleMiddleware('ADMIN'), productController.addNewProduct);
router.put('/update/:id', authMiddleware, checkRoleMiddleware('ADMIN'), productController.updateExistingProduct);
router.delete('/delete/:id', authMiddleware, checkRoleMiddleware('ADMIN'), productController.deleteExistingProduct);
router.post('/addToCart/:id', authMiddleware, productController.addProductToCart);
router.delete('/deleteFromCart/:id', authMiddleware, productController.deleteProductFromCart);
router.post('/addRating/:id', authMiddleware, productController.addRating);
router.delete('/deleteRating/:id', authMiddleware, productController.deleteRating);
router.get('/search', productSearchSortController.nameSearch);
router.get('/sort', productSearchSortController.sort);
router.get('/:id', productController.getSingleProduct);

module.exports = router;