const {Product, Description, Rating, Cart, CartItem} = require("../models/models");
const ApiError = require("../error/apiError");

class ProductService {
    async getSingleProduct(next, id, res) {
        try {
            const product = await Product.findOne({
                where: {id},
                include: [{model: Description, as: 'info'}]
            });

            if (!product)
                throw ApiError.badRequest('Product not found!');

            let averageRating = await this.countRating(id);

            return {
                ...product.toJSON(),
                averageRating: averageRating
            };
        } catch (err) {
            return next(ApiError.internal(err.message));
        }
    }

    async getAllProducts(typeId, producerId, limit, offset) {
        let products
        if (!typeId && producerId) {
            products = await Product.findAndCountAll({
                where: {producerId},
                include: [{model: Description, as: 'info'}],
                limit,
                offset
            });
        } else if (typeId && !producerId) {
            products = await Product.findAndCountAll({
                where: {typeId},
                include: [{model: Description, as: 'info'}, {model: Rating}],
                limit,
                offset
            });
        } else if (typeId && producerId) {
            products = await Product.findAndCountAll({
                where: {typeId, producerId},
                include: [{model: Description, as: 'info'}],
                limit,
                offset
            });
        } else {
            products = await Product.findAndCountAll({
                include: [{model: Description, as: 'info'}],
                limit,
                offset
            });
        }
        return products;
    }

    async addNewProduct(producerId, countryId, price, name, imgName, typeId, info, next) {

        if (await Product.findOne({
            where: {
                name,
                producerId
            }
        })) {
            throw ApiError.badRequest('This product is already exists');
        }

        const addedProduct = await Product.create({
            name,
            price,
            image: imgName,
            producerId,
            typeId,
            countryId
        });

        if (info) {
            info = JSON.parse(info);
            info.forEach((data) => {
                Description.create({
                    title: data.title,
                    description: data.description,
                    productId: addedProduct.id
                });
            })
        }

        return addedProduct;
    }

    async updateProduct(producerId, price, typeId, countryId, imgName, name, info, id, next) {
        if(!countryId) countryId = 1;
        await Product.update(
            {
                name, price, producerId, typeId, countryId, imgName
            },
            {
                where: {id}
            });
        if (info) {
            info = JSON.parse(info);
            const existingDescriptions = await Description.findAll({where: {productId: id}});
            for (const data of info) {
                const existingDescription = existingDescriptions.find(d => d.title === data.title);
                if (existingDescription) {
                    await Description.update(
                        {
                            title: data.title,
                            description: data.description
                        },
                        {
                            where: {id: existingDescription.id}
                        }
                    );
                } else {
                    await Description.create({
                        title: data.title,
                        description: data.description,
                        productId: id
                    });
                }
            }
        }
        return await Product.findOne({
            where: {id}
        });
    }

    async addToCart(req, productId, next) {
        const product = await Product.findOne({
            where: {id: productId}
        });

        if (!product)
            throw ApiError.badRequest("Product doesn't exist");

        const cart = await Cart.findOne({
            where: {userId: req.user.id}
        });

        return await CartItem.findOrCreate({
            where: {
                cartId: cart.id,
                productId
            }
        });
    }

    async deleteFromCart(req, productId, next) {
        const cart = await Cart.findOne({
            where: {userId: req.user.id}
        });

        if (!await CartItem.findOne({
            where:
                {
                    productId,
                    cartId: cart.id
                }
        })) {
            throw ApiError.badRequest('There is no such product in your cart');
        }

        await CartItem.destroy({
            where:
                {
                    productId,
                    cartId: cart.id
                }
        });
    }

    async addRating(req, productId, rating, next) {
        const existingRating = await Rating.findOne({
            where: {
                userId: req.user.id,
                productId
            }
        });

        if (!existingRating) {
            await Rating.create({
                userId: req.user.id,
                productId,
                rating
            });
        } else
            throw ApiError.badRequest('Your rating on this product is already exist!');
    }

    countRating = async (productId) => {
        const ratings = await Rating.findAll({
            where: {productId}
        });

        let sum = 0;
        ratings.forEach((rating) => {
            const ratingVal = parseInt(rating.rating, 10);
            sum += ratingVal;
        });
        return sum / ratings.length;
    }
}

module.exports = new ProductService();