const apiError = require('../error/apiError');

class UserController{
    async register(req, res){}

    async login(req, res){}

    async check(req, res, next) {
        const {id} = req.query;
        if(!id){
            return next(apiError.badRequest('id is not defined'));
        }
    }

    async delete(req, res){};
}

module.exports = new UserController();