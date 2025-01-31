const uuid = require('uuid');
const path = require('path');
const {Product, Rating} = require('../models/models');
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');
const productService = require('../Services/productService');

class ProductController {

    async getSingleProduct(req, res, next) {
        const {id} = req.params;
        return res.json(await productService.getSingleProduct(next, id, res));
    }

    async getAllProducts(req, res, next) {
        try {
            let {producerId, typeId, limit, page} = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;

            return res.json(await productService.getAllProducts(typeId, producerId, limit, offset));
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async addNewProduct(req, res, next) {
        try {
            let {name, price, producerId, typeId, countryId, info} = req.body;

            let imgName = "";
            if (req.files) {
                const {img} = req.files;
                if (img) {
                    imgName = uuid.v4() + '.jpg';
                    await img.mv(path.resolve(__dirname, '..', 'static', imgName));
                }
            }

            return res.json(await productService.addNewProduct(producerId, countryId, price, name, imgName, typeId, info, next));
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async updateExistingProduct(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            let {name, price, producerId, typeId, countryId, info} = req.body;
            let imgName = "";
            if (req.files) {
                const {img} = req.files;
                if (img) {
                    imgName = uuid.v4() + '.jpg';
                }
            }

            return res.json(await productService.updateProduct(producerId, price, typeId, countryId, imgName, name, info, id, next));
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async deleteExistingProduct(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);

            await Product.destroy({
                where: {id}
            });

            return res.json("Product has been successfully deleted!");
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async addProductToCart(req, res, next) {
        try {
            const {id} = req.params;

            if (await productService.addToCart(req, id, next))
                return res.json('Item has been successfully added');
            else
                return next(ApiError.badRequest(('Item is already in your cart')));
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async deleteProductFromCart(req, res, next) {
        try {
            const {id} = req.params;

            await productService.deleteFromCart(req, id, next);

            return res.json('Product has been successfully deleted from cart');
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async addRating(req, res, next) {
        try {
            const {id} = req.params;
            const {rating} = req.body;

            await productService.addRating(req, id, rating, next);

            return res.json('Rating successfully published');
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async deleteRating(req, res, next) {
        try {
            const user = jwt.decode(req.headers.authorization.split(' ')[1]);
            const {id} = req.params;
            await Rating.destroy({
                where:
                    {
                        userId: user.id,
                        productId: id
                    }
            });
            return res.json('Rating has been successfully deleted!');
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }
}

module.exports = new ProductController();