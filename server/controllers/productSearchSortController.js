const {Product, Producer, Type} = require('../models/models');
const ApiError = require('../error/apiError');
const {Op} = require("sequelize");

class ProductSearchSortController {
    async nameSearch(req, res, next) {
        const {name} = req.query;

        if (!name)
            return next(ApiError.badRequest('Name is not defined'));

        const products = await Product.findAll({
            where: {name}
        });

        if (!products)
            return res.json("not found!")

        return res.json(products);
    }

    async producerNameSort(req, res, next) {
        try {
            const {producerName} = req.query;
            if (!producerName)
                return next(ApiError.badRequest('Producer name is not defined'));

            const producer = await Producer.findOne({
                where: {name: producerName}
            });

            if (!producer)
                return res.json("not found");

            const products = await Product.findAll({
                where: {producerId: producer.id}
            });
            return res.json(products);
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async typeSort(req, res, next) {
        try {
            const {type} = req.query;
            if (!type)
                return next(ApiError.badRequest('Type is not defined'));

            const typeData = await Type.findOne({
                where: {name: type}
            });

            if (!typeData)
                return res.json('not found!')

            const products = await Product.findAll({
                where: {typeId: typeData.id}
            });

            return res.json(products);
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async priceSort(req, res, next) {
        try {
            const {minPrice, maxPrice, sortOrder} = req.query;

            if (!minPrice && !maxPrice) {
                return next(ApiError.badRequest('Prices are not defined!'));
            }

            const products = await Product.findAll({
                where: {
                    price: {
                        [Op.gte]: minPrice || 0,
                        [Op.lte]: maxPrice || Number.MAX_VALUE
                    }
                },
                order: [['price', sortOrder || 'ASC']]
            });

            return res.json(products);
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }
}

module.exports = new ProductSearchSortController();