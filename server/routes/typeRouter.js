const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');

router.get('/all', typeController.getAllTypes);
router.post('/add', typeController.addType);
router.delete('/delete', typeController.deleteType);

module.exports = router;