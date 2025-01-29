const jwt = require('jsonwebtoken');
const {getNamespace} = require('cls-hooked');
const ApiError = require('../error/apiError');

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS'){
        next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            next(ApiError.unauthorized());
        }

        const clsNamespace = getNamespace('my-app-namespace');
        const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedUser;
        clsNamespace.set('userRole', decodedUser.role);
        next();
    }catch (e){
        next(ApiError.unauthorized());
    }
}