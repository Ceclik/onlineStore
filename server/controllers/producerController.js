const {Producer} = require('../models/models');
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
    async deleteExistingProducer(req, res) {}
}

module.exports = new ProducerController();