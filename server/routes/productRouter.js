const Router = require('express');
const router = new Router();
const productController = require('../controllers/productsController');
const checkRoleMiddleware = require("../middleware/errorHadlingMiddleware");

router.get('/getOne/:id', productController.getSingleProduct);
router.get('/all', productController.getAllProduct);
router.post('/add', checkRoleMiddleware('ADMIN'), productController.addNewProduct);
router.put('/update/:name', checkRoleMiddleware('ADMIN'), productController.updateExistingProduct);
router.delete('/delete/:name', checkRoleMiddleware('ADMIN'), productController.deleteExistingProduct);


module.exports = router;