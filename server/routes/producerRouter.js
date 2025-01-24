const Router = require('express');
const router = new Router();
const producerController = require('../controllers/producerController');
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get('/getOne/:id', producerController.getSingleProducer);
router.get('/all', producerController.getAllProducers);
router.post('/add', checkRoleMiddleware('ADMIN'), producerController.addNewProducer);
router.put('/update/:id', checkRoleMiddleware('ADMIN'), producerController.updateExistingProducer);
router.delete('/delete/:id', checkRoleMiddleware('ADMIN'), producerController.deleteExistingProducer);

module.exports = router;