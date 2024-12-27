const apiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const {User, Cart} = require('../models/models');
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    );
}

class UserController{

    async register(req, res, next){
        const {email, password, role} = req.body;
        if(!email || !password){
            return next(ApiError.badRequest('undefined password or email')) //TODO переделать нормально по видосу с авторизацией
        }

        const candidate = await User.findOne({where: {email}});
        if(candidate){
            return next(ApiError.badRequest('User with this email already exists'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const createdUser = await User.create({email, password: hashPassword, role});
        const createdCart = Cart.create({userId: createdUser.id});

        const token = generateJwt(createdUser.id, email, createdUser.role);
        return res.json(token);
    }

    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({
            where: {email}
        });

        if(!user){
            return next(ApiError.badRequest('no user with such email'));
        }
        let comparedPassword = bcrypt.compareSync(password, user.password);
        if(!comparedPassword){
            return next(ApiError.badRequest('wrong password'));
        }

        const token = generateJwt(user.id, email, user.role);

        return res.json(token);
    }

    async check(req, res, next) {
        const {id} = req.query;
        if(!id){
            return next(apiError.badRequest('id is not defined'));
        }
    }

    async delete(req, res){};
}

module.exports = new UserController();