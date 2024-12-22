const uuid = require('uuid');
const path = require('path');
const {Product} = require('../models/models');
const ApiError = require('../error/apiError');

class ProductsController{

    async getSingleProduct(req, res){}
    async getAllProduct(req, res){}
    async addNewProduct(req, res, next){
        try {
            const {name, price, producer_id, type_id, country_id, description} = req.body;
            const {img} = req.files;
            let imgName = uuid.v4() + '.jpg';
            await img.mv(path.resolve(__dirname, '..', 'static', imgName));

            const addedProduct = await Product.create({name, price, image: imgName, producer_id, type_id, country_id});
            return res.json(addedProduct);
        }
        catch (err){
            next(ApiError.badRequest(err.message));
        }
    }
    async updateExistingProduct(req, res){}
    async deleteExistingProduct(req, res) {}
}

module.exports = new ProductsController();