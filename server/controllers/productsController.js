const uuid = require('uuid');
const path = require('path');
const {Product} = require('../models/models');
const {Country} = require('../models/models');
const ApiError = require('../error/apiError');

class ProductsController{

    async getSingleProduct(req, res){}

    async getAllProduct(req, res){
        const {producerId, typeId} = req.query;
        let products
        if(!typeId && producerId){
            products = await Product.findAll({
                where: {producerId}
            });
        }
        else if(typeId && !producerId){
            products = await Product.findAll({
                where: {typeId}
            });
        }
        else if(typeId && producerId){
            products = await Product.findAll({
                where: {typeId, producerId}
            });
        }
        else {
            products = await Product.findAll();
        }

        return res.json(products);
    }

    async addNewProduct(req, res, next){
        try {
            const {name, price, producerId, typeId, country, description} = req.body;
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

            return res.json(addedProduct);
        }
        catch (err){
            next(ApiError.badRequest(err.message));
        }
    }
    async updateExistingProduct(req, res){}
    async deleteExistingProduct(req, res) {}
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

module.exports = new ProductsController();