const apiError = require("../error/apiError");
const {Producer, TypeBrand, Type} = require("../models/models");
const ApiError = require("../error/apiError");

class ProducerService {

    async addNewProducer(name, typeId, countryId, next) {
        if (!name) {
            return next(apiError.badRequest('name is not defined!'));
        }
        if (await Producer.findOne({
            where: {name}
        })) {
            return next(ApiError.badRequest('This producer is already exists!'));
        }

        const newProducer = await Producer.create({name, countryId, typeId});
        if(typeId) {
            await TypeBrand.create({producerId: newProducer.id, typeId});
        }
        return newProducer;
    }

    getSingleProducer = async (id, next) => {
        const producer = await Producer.findOne({
            where: {id},
        });

        if (!producer)
            return next(ApiError.badRequest("Producer not found!"));

        const typeIds = await TypeBrand.findAll({where: {producerId: producer.id}});

        let types = '';
        for (let type = 0; type < typeIds.length; type++) {
            const foundType = await Type.findOne({where: {id: typeIds[type].id}});
            types += foundType.name + '; ';
        }

        return {
            ...producer.toJSON(),
            types: types
        };
    }

    async getAllProducers() {
        return await Producer.findAll();
    }

    async updateExistingProducer(name, id, next) {
        const producer = await Producer.findOne({
            where: {
                id,
                name: name
            }
        });

        if (producer)
            return next(ApiError.badRequest('Producer with this name already exists'));

        await Producer.update(
            {name: name},
            {where: {id}}
        );

        return await this.getSingleProducer(id, next);
    }
}

module.exports = new ProducerService();