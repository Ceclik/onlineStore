const ApiError = require('../error/apiError');
const {getNamespace} = require('cls-hooked');

module.exports = function(role){
    return function (req, res, next) {
        if(req.method === 'OPTIONS'){
            next();
        }
        try{
            const clsNamespace = getNamespace('my-app-namespace');
            if (clsNamespace.get('userRole' !== role))
                next(ApiError.forbidden())
            next();
        }catch (e){
            next(ApiError.unauthorized());
        }
}



}