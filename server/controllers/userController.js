const {User} = require('../models/models');
const ApiError = require('../error/apiError');
const userService = require('../services/userService');

class UserController {

    async register(req, res, next) {
        const {email, password, role} = req.body;
        return res.json(await userService.register(email, password, next, role));
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            if (!email || !password) throw ApiError.badRequest();
            return res.json(await userService.login(email, password, next));
        }catch (e){
            next(e);
        }
    }

    async check(req, res) {
        const token = userService.generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json(token);
    }

    async delete(req, res, next) {
        try {
            await User.destroy({
                where: {email: req.user.email}
            });
            return res.json(deletedUser);
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }

    async update(req, res, next) {
        try {
            const {email, password} = req.body;

            return res.json(await userService.update(email, password, req));
        } catch (err) {
            next(ApiError.internal(err.message));
        }
    }
}

module.exports = new UserController();