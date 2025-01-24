const {Type} = require('../models/models')
const apiError = require('../error/apiError');

class TypeController {
    async getAllTypes(req, res) {
        const allTypes = await Type.findAll();
        return res.json(allTypes);
    }

    async deleteType(req, res, next) {
        const {name} = req.body;
        if (!name) {
            return next(apiError.badRequest('name is not defined!'));
        }

        if (await Type.findOne({
            where: {name}
        })) {
            return next(apiError.badRequest('This type already exists!'))
        }

        await Type.destroy({
            where: {name}
        });

        return res.body('Type successfully deleted!')
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