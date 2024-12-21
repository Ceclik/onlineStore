const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const producerRouter = require('./producerRouter');
const typeRouter = require('./typesRouter');
const countriesRouter = require('./countriesRouter')

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/producer', producerRouter);
router.use('/type', typeRouter);
router.use('/country', countriesRouter);

module.exports = router;