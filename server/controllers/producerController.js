const apiError = require("../error/apiError");
const {Producer} = require("../models/models");
const ApiError = require("../error/apiError");

class ProducerController {

    async getSingleProducer(req, res) {
        const {id} = req.params;
        return res.json(await Producer.findOne(
            {
                where: {id}
            }
        ));
    }

    async getAllProducers(req, res) {
        const allProducers = await Producer.findAll();
        return res.json(allProducers);
    }

    async addNewProducer(req, res, next) {
        try {
            const {name, countryId} = req.body;
            if (!name) {
                return next(apiError.badRequest('name is not defined!'));
            }
            if (await Producer.findOne({
                where: {name}
            })) {
                return next(ApiError.badRequest('This producer is already exists!'));
            }
            const addedProducer = await Producer.create({name, countryId});
            return res.json(addedProducer);
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async updateExistingProducer(req, res, next) {
        try {
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
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async deleteExistingProducer(req, res, next) {
        const {id} = req.params;
        if (!id) {
            return next(apiError.badRequest('producer is not defined!'));
        }
        await Producer.destroy({
            where: {id}
        });

        return res.json("Producer has been successfully deleted!");
    }
}

module.exports = new ProducerController();