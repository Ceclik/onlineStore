const apiError = require("../error/apiError");
const {Producer} = require("../models/models");
const ApiError = require("../error/apiError");

class ProducerController{

    async getSingleProducer(req, res){
        const {name} = req.params;
        return res.json(await Producer.findOne(
            {
                where: {name}
            }
        ));
    }

    async getAllProducers(req, res){
        const allProducers = await Producer.findAll();
        return res.json(allProducers);
    }
    async addNewProducer(req, res, next){
        try {
            const {name, countryId} = req.body;
            if (!name) {
                return next(apiError.badRequest('name is not defined!'));
            }
            if(await Producer.findOne({
                where: {name}
            })){
                return next(ApiError.badRequest('This producer is already exists!'));
            }
            const addedProducer = await Producer.create({name, countryId});
            return res.json(addedProducer);
        }
        catch (err){
            next(ApiError.badRequest(err.message));
        }
    }

    async updateExistingProducer(req, res){

        const id = parseInt(req.params.id, 10);
        const {newName} = req.body;

        await Producer.update(
            {name: newName},
            {where: {id}}
        );

        const updatedProducer = await Producer.findOne({
            where: {id}
        });

        return res.json(updatedProducer);
    }

    async deleteExistingProducer(req, res, next) {
        const {name} = req.params;
        if(!name){
            return next(apiError.badRequest('name is not defined!'));
        }
        const deletedProducer = await Producer.findOne({
            where: {name}
        });
        await Producer.destroy({
            where : {name}
        });

        return res.json(deletedProducer);
    }
}

module.exports = new ProducerController();