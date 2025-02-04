const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/all', typeController.getAllTypes);
router.post('/add', authMiddleware, checkRoleMiddleware('ADMIN'), typeController.addType);
router.delete('/delete/:typeId', authMiddleware, checkRoleMiddleware('ADMIN'), typeController.deleteType);

module.exports = router;