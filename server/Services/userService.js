const jwt = require("jsonwebtoken");
const {User, Cart} = require("../models/models");
const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");

const checkEmailExist = async (email) => {
    const originalEmail = await User.findOne({
        where: {email}
    });
    if (originalEmail)
        throw new Error("Email couldn't be the same with previous email!");
}

const checkPasswordExist = async (hashPassword, originalId) => {
    const originalPassword = await User.findOne({
        where: {
            id: originalId,
            password: hashPassword
        }
    });
    if (originalPassword)
        throw new Error("Passwords couldn't be same with previous password!");
}

class UserService {
    generateJwt = (id, email, role) => {
        return jwt.sign(
            {id, email, role},
            process.env.SECRET_KEY,
            {expiresIn: '12h'}
        );
    }

    async register(email, password, next, role) {
        if (!email || !password) {
            return next(ApiError.badRequest('undefined password or email')) //TODO переделать нормально по видосу с авторизацией
        }

        const candidate = await User.findOne({where: {email}});
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const createdUser = await User.create({email, password: hashPassword, role});
        await Cart.create({userId: createdUser.id});

        return generateJwt(createdUser.id, email, createdUser.role);
    }

    async login(email, password, next) {
        const user = await User.findOne({
            where: {email}
        });

        if (!user) {
            return next(ApiError.badRequest('no user with such email'));
        }
        let comparedPassword = bcrypt.compareSync(password, user.password);
        if (!comparedPassword) {
            return next(ApiError.badRequest('wrong password'));
        }

        return this.generateJwt(user.id, email, user.role);
    }

    async update(email, password, req) {
        if (password && !email) {
            const hashPassword = await bcrypt.hash(password, 5);
            await checkPasswordExist(hashPassword, req.user.id);
            await User.update({
                    password: hashPassword
                },
                {
                    where: {id: req.user.id}
                });
        } else if (email && !password) {
            await checkEmailExist(email);
            await User.update({
                    email
                },
                {
                    where: {id: req.user.id}
                });
        } else if (password && email) {
            const hashPassword = await bcrypt.hash(password, 5);

            await checkEmailExist(email);
            await checkPasswordExist(hashPassword, req.user.id);

            await User.update({
                    password: hashPassword,
                    email
                },
                {
                    where: {id: req.user.id}
                });
        }
        const updatedUser = await User.findOne({
            where: {id: req.user.id}
        });

        return this.generateJwt(updatedUser.id, updatedUser.email, updatedUser.role);
    }
}

module.exports = new UserService();