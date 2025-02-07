const {Type, Product} = require('../models/models')
const apiError = require('../error/apiError');
const ApiError = require("../error/apiError");
const {Op} = require("sequelize");

class TypeController {
    async getAllTypes(req, res) {
        const allTypes = await Type.findAll();
        return res.json(allTypes);
    }

    async getOne(req, res, next){
        try {
            const {id} = req.params;
            return res.json(await Type.findOne({where: {id}}));
        }catch(e){
            next(ApiError.internal());
        }
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
        try {
            const {name} = req.body;
            if (!name) {
                throw apiError.badRequest('name is not defined!');
            }

            const type = await Type.findOne({
                where: {name}
            });

            if(type)
                throw ApiError.badRequest("This type is already exist");

            const createdType = await Type.create({name});
            return res.json({"createdType": {createdType}});
        }catch(e){
            next(e);
        }
    }

    async nameSearch(req, res, next){
        try {
            const { name } = req.query;

            if (!name)
                return next(ApiError.badRequest('Name is not defined'));

            const types = await Type.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                }
            });

            if (!types.length)
                return next(ApiError.badRequest("not found!"));

            return res.json(types);
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }
}

module.exports = new TypeController();