const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const producerRouter = require('./producerRouter');
const typeRouter = require('./typeRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/producer', producerRouter);
router.use('/type', typeRouter);

module.exports = router;