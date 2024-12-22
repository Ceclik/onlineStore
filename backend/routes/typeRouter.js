const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');

router.get('/all', typeController.addType);
router.post('/add', typeController.addType);
router.delete('/delete', typeController.deleteType);

module.exports = router;