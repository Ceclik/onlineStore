const Router = require('express');
const router = new Router();
const producerController = require('../controllers/producerController');
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");
const authMiddleware = require('../middleware/authMiddleware');

router.get('/all', producerController.getAllProducers);
router.post('/add', authMiddleware, checkRoleMiddleware('ADMIN'), producerController.addNewProducer);
router.put('/update/:id', authMiddleware, checkRoleMiddleware('ADMIN'), producerController.updateExistingProducer);
router.delete('/delete/:id', authMiddleware, checkRoleMiddleware('ADMIN'), producerController.deleteExistingProducer);
router.get('/:id', producerController.getSingleProducer);

module.exports = router;