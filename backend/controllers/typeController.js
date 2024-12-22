const {Type} = require('../models/models')
const apiError = require('../error/apiError');

class TypeController{
    async getAllTypes(req, res){
        const allTypes = await Type.findAll();
        return res.json(allTypes);
    }

    async deleteType(req, res) {}

    async addType(req, res, next){
        const {name} = req.body;
        if(!name){
            return next(apiError.badRequest('name is not defined!'));
        }
        const createdType = await Type.create({name});
        return res.json({"createdType" : {createdType}});
    }
}

module.exports = new TypeController();