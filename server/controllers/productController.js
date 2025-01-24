const uuid = require('uuid');
const path = require('path');
const {Product, Country, Description, CartItem, Cart, Rating} = require('../models/models');
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');
const {where, Sequelize} = require("sequelize");

class ProductController {

    async getSingleProduct(req, res, next){
        const {id} = req.params;
        const product = await Product.findOne({
            where: {id},
            include: [{model: Description, as: 'info'}]
        });

        if(!product)
            return next(ApiError.badRequest('Product not found!'));

        let averageRating = await countRating(id);

        const productWithRating = {
            ...product.toJSON(),
            averageRating: averageRating
        };

        return res.json(productWithRating);
    }

    async getAllProduct(req, res, next){
        try {
            let {producerId, typeId, limit, page} = req.query;

            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;

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

            return res.json(products);
        }
        catch(err){
            next(ApiError.badRequest(err.message));
        }
    }

    async addNewProduct(req, res, next){
        try {
            let {name, price, producerId, typeId, country, info} = req.body;
            const {img} = req.files;
            let imgName = uuid.v4() + '.jpg';
            await img.mv(path.resolve(__dirname, '..', 'static', imgName));

            const productCountry = await checkOrCreate(country, next)
            const addedProduct = await Product.create({
                name,
                price,
                image: imgName,
                producerId,
                typeId,
                countryId: productCountry.id
            });

            if(info){
                info = JSON.parse(info);
                info.forEach((data) => {
                    Description.create({
                        title: data.title,
                        description: data.description,
                        productId: addedProduct.id
                    });
                })
            }
            return res.json(addedProduct);
        }
        catch (err){
            next(ApiError.badRequest(err.message));
        }
    }

    async updateExistingProduct(req, res, next){
        try{
            const id = parseInt(req.params.id, 10);
            let {name, price, producerId, typeId, country, info} = req.body;
            let imgName;
            if(req.files) {
                const {img} = req.files;
                if (img) {
                    imgName = uuid.v4() + '.jpg';
                }
            }

            const newProductCountry = await checkOrCreate(country, next)

            await Product.update(
                {
                    name, price, producerId, typeId, newProductCountry, imgName
                },
                {
                    where: {id}
                });

            if (info) {
                info = JSON.parse(info);

                const existingDescriptions = await Description.findAll({ where: { productId: id } });

                for (const data of info) {
                    const existingDescription = existingDescriptions.find(d => d.title === data.title);
                    if (existingDescription) {
                        await Description.update(
                            {
                                title: data.title,
                                description: data.description
                            },
                            {
                                where: { id: existingDescription.id }
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
            const updatedProduct = Product.findOne({
                where: {id}
            });

            return res.json(updatedProduct);
        }catch (err){
            next(ApiError.badRequest(err.message));
        }
    }

    async deleteExistingProduct(req, res, next) {
        try{
            const id = parseInt(req.params.id, 10);
            const deletedProduct = await Product.findOne({
                where: {id}
            });

            await Product.destroy({
                where:{id}
            });

            return res.json(deletedProduct);
        }catch (err){
            next(ApiError.badRequest(err.message));
        }
    }

    async addProductToCart(req, res, next){
        try{
            const user = jwt.decode(req.headers.authorization.split(' ')[1]);
            const {productId} = req.params;

            const product = await Product.findOne({
                where: {id: productId}
            });

            if(!product)
                return next(ApiError.badRequest("Product doesn't exist"));

            const cart = await Cart.findOne({
                where: {userId: user.id}
            });

            const [record, created] = await CartItem.findOrCreate({where: {
                cartId: cart.id,
                productId
            }});

            if(created)
                return res.json('Item has been successfully added');
            else
                return next(ApiError.badRequest(('Item is already in your cart')));
        }
        catch(err){
            next(ApiError.badRequest(err.message));
        }
    }

    async deleteProductFromCart(req, res, next){
        try{
            const user = jwt.decode(req.headers.authorization.split(' ')[1]);
            const {productId} = req.params;

            const cart = await Cart.findOne({
                where: {userId: user.id}
            });

            if(!await CartItem.findOne({where:
                    {productId,
                    cartId: cart.id}})) {
                return next(ApiError.badRequest('There is no such product in your cart'));
            }

            await CartItem.destroy({where:
                    {
                        productId,
                        cartId: cart.id
                    }});

            return res.json('Product has been successfully deleted from cart');
        }
        catch(err){
            next(ApiError.badRequest(err.message));
        }
    }

    async addRating(req, res, next){
        try{
            const user = jwt.decode(req.headers.authorization.split(' ')[1]);
            const {productId} = req.params;
            const {rating} = req.body;

            const existingRating = await Rating.findOne({
                where: {userId: user.id,
                    productId}
            });

            if(!existingRating)
            {
                await Rating.create({
                    userId: user.id,
                    productId,
                    rating
                });
            }
            else
                return next(ApiError.badRequest('Your rating on this product is already exist!'));

            return res.json('Rating successfully published');
        }
        catch(err){
            next(ApiError.badRequest(err.message));
        }
    }

    async deleteRating(req, res, next){
        try{
            const user = jwt.decode(req.headers.authorization.split(' ')[1]);
            const {productId} = req.params;
            await Rating.destroy({where:
                    {
                        userId: user.id,
                        productId
                    }});
            return res.json('Rating has been successfully deleted!');
        }catch(err){
            next(ApiError.badRequest(err.message));
        }
    }
}

const countRating = async (productId) => {
    const ratings = await Rating.findAll({
        where: {productId}
    });

    let sum = 0;
    ratings.forEach((rating) => {
        const ratingVal = parseInt(rating.rating, 10);
        sum += ratingVal;
    });
    return sum/ratings.length;
}

const checkOrCreate = async (nameValue, next) =>{
    try {
        const [record, created] = await Country.findOrCreate({
            where: {name: nameValue},
            defaults: {name: nameValue}
        });

        if (created) {
            console.log('Запись создана:', record);
        } else {
            console.log('Запись уже существует:', record);
        }
        return record;

    }catch (err){
        next(ApiError.badRequest(err.message));
    }
}

module.exports = new ProductController();