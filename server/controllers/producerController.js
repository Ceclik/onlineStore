const {Producer, Product} = require('../models/models');
const apiError = require("../error/apiError");

class ProducerController{

    async getSingleProducer(req, res){}
    async getAllProducers(req, res){
        const allProducers = await Producer.findAll();
        return res.json(allProducers);
    }
    async addNewProducer(req, res, next){
        const {name, countryId} = req.body;
        if(!name){
            return next(apiError.badRequest('name is not defined!'));
        }
        const addedProducer = await Producer.create({name, countryId});
        return res.json(addedProducer);
    }
    async updateExistingProducer(req, res){}
    async deleteExistingProducer(req, res, next) {
        const {name} = req.body;
        if(!name){
            return next(apiError.badRequest('name is not defined!'));
        }
        const deletedProducer = await Producer.findOne({
            where: {name}
        });
        await Producer.destroy({
            where : {name}
        });

       /* const productsOfDeletedProducer = await Product.findAll({
            where: {producerId: deletedProducer.id}
        });*/

        await Product.destroy({
            where: {id: deletedProducer.id}
        });

        return res.json(deletedProducer);
    }
}

module.exports = new ProducerController();