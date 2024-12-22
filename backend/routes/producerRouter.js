const Router = require('express');
const router = new Router();
const producerController = require('../controllers/producerController');

router.get('/getOne/:name', producerController.getSingleProducer);
router.get('/getAll', producerController.getAllProducers);
router.post('/add', producerController.addNewProducer);
router.put('update/:name', producerController.updateExistingProducer);
router.delete('/delete/:name', producerController.deleteExistingProducer);

module.exports = router;