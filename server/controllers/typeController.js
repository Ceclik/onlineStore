const {Type} = require('../models/models')
const apiError = require('../error/apiError');

class TypeController {
    async getAllTypes(req, res) {
        const allTypes = await Type.findAll();
        return res.json(allTypes);
    }

    async deleteType(req, res, next) {
        try {
            const {typeId} = req.params;
            console.log(`Type id: ${typeId}`)
            if (!typeId) {
                throw apiError.badRequest();
            }

            if (!await Type.findOne({
                where: {id: typeId}
            })) {
                throw apiError.badRequest("This type doesn't exist");
            }

            await Type.destroy({
                where: {id: typeId}
            });

            return res.json('Type successfully deleted!');
        }
        catch (e) {
            next(e);
        }
    }

    async addType(req, res, next) {
        const {name} = req.body;
        if (!name) {
            return next(apiError.badRequest('name is not defined!'));
        }
        const createdType = await Type.create({name});
        return res.json({"createdType": {createdType}});
    }
}

module.exports = new TypeController();