const uuid = require('uuid');
const path = require('path');
const {Product, Country, Description} = require('../models/models');
const ApiError = require('../error/apiError');

class ProductController {

    async getSingleProduct(req, res){
        const {id} = req.params;
        const product = await Product.findOne({
            where: {id},
            include: [{model: Description, as: 'info'}]
        });

        return res.json(product);
    }

    async getAllProduct(req, res){
        let {producerId, typeId, limit, page} = req.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        let products
        if(!typeId && producerId){
            products = await Product.findAndCountAll({
                where: {producerId},
                limit,
                offset
            });
        }
        else if(typeId && !producerId){
            products = await Product.findAndCountAll({
                where: {typeId},
                limit,
                offset
            });
        }
        else if(typeId && producerId){
            products = await Product.findAndCountAll({
                where: {typeId, producerId},
                limit,
                offset
            });
        }
        else {
            products = await Product.findAndCountAll({
                limit,
                offset
            });
        }

        return res.json(products);
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