const Router = require('express');
const router = new Router();
const producerController = require('../controllers/producerController');
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.get('/getOne/:name', producerController.getSingleProducer);
router.get('/all', producerController.getAllProducers);
router.post('/add', checkRoleMiddleware('ADMIN'), producerController.addNewProducer);
router.put('/update/:name', checkRoleMiddleware('ADMIN'), producerController.updateExistingProducer);
router.delete('/delete', checkRoleMiddleware('ADMIN'), producerController.deleteExistingProducer);

module.exports = router;