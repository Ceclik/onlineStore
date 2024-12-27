const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRoleMiddleware = require('../middleware/errorHadlingMiddleware');

router.get('/all', typeController.getAllTypes);
router.post('/add', checkRoleMiddleware('ADMIN'), typeController.addType);
router.delete('/delete', checkRoleMiddleware('ADMIN'), typeController.deleteType);

module.exports = router;