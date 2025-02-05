const {Product} = require('../models/models');
const ApiError = require('../error/apiError');
const productSearchSortService = require('../services/productSearchSortService');

class ProductSearchSortController {
    async nameSearch(req, res, next) {
        try {
            const {name} = req.query;

            if (!name)
                return next(ApiError.badRequest('Name is not defined'));

            const products = await Product.findAll({
                where: {name}
            });

            if (!products)
                return res.json("not found!")

            return res.json(products);
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async sort(req, res, next) {
        try {
            const {producerName, type, minPrice, maxPrice, sortOrder} = req.query;
            let response;
            if (producerName && !type && !minPrice && !maxPrice && !sortOrder)
                response = await productSearchSortService.producerNameSort(res, producerName);
            else if (type && !minPrice && !maxPrice && !sortOrder && !producerName)
                response = await productSearchSortService.typeSort(res, type);
            else if (((minPrice || maxPrice) && sortOrder) && !type && !producerName)
                response = await productSearchSortService.priceSort(minPrice, maxPrice, sortOrder);

            return res.json(response || 'not found!');
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }
}

module.exports = new ProductSearchSortController();