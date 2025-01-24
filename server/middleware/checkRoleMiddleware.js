const jwt = require('jsonwebtoken');

module.exports = function(role){
    return function (req, res, next) {
        if(req.method === 'OPTIONS'){
            next();
        }
        try{
            const token = req.headers.authorization.split(' ')[1];
            if (!token){
                return res.status(401).json({message: 'User is not authorized'});
            }

            const decodedUser = jwt.verify(token, process.env.SECRET_KEY);

            if(decodedUser.role !== role){
                return res.statusCode(403).json({message: "You haven't got permission"});
            }

            req.user = decodedUser;

            next();
        }catch (e){
            res.status(401).json({message: 'User is not authorized'});
        }
}



}