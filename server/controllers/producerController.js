const {Producer} = require("../models/models");
const ApiError = require("../error/apiError");
const producerService = require('../services/producerService');

class ProducerController {

    async getSingleProducer(req, res, next) {
        try {
            const {id} = req.params;
            return res.json(await producerService.getSingleProducer(id, next));
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async getAllProducers(req, res) {
        return res.json(await producerService.getAllProducers());
    }

    async addNewProducer(req, res, next) {
        try {
            const {name, countryId, typeId} = req.body;

            return res.json(await producerService.addNewProducer(name, typeId, countryId, next));
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async updateExistingProducer(req, res, next) {
        try {
            const id = parseInt(req.params.id, 10);
            const {name} = req.body;

            return res.json(await producerService.updateExistingProducer(name, id, next));
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async deleteExistingProducer(req, res, next) {

        const {id} = req.params;
        if (!id) {
            return next(ApiError.badRequest());
        }

        const deletedUsers = await Producer.destroy({
            where: {id}
        });

        if (deletedUsers === 0)
            return next(ApiError.badRequest());

        return res.json("Producer has been successfully deleted!");
    }
}

module.exports = new ProducerController();