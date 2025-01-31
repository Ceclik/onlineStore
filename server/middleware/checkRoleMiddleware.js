const ApiError = require('../error/apiError');

module.exports = function(role){
    return function (req, res, next) {
        if(req.method === 'OPTIONS'){
            next();
        }
        try{
            if (req.user.role !== role)
                next(ApiError.forbidden())
            next();
        }catch (e){
            next(ApiError.unauthorized());
        }
}



}