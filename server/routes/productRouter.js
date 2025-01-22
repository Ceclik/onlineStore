const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController');
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get('/getOne/:id', productController.getSingleProduct);
router.get('/all', productController.getAllProduct);
router.post('/add', checkRoleMiddleware('ADMIN'), productController.addNewProduct);
router.put('/update/:id', checkRoleMiddleware('ADMIN'), productController.updateExistingProduct);
router.delete('/delete/:id', checkRoleMiddleware('ADMIN'), productController.deleteExistingProduct);


module.exports = router;