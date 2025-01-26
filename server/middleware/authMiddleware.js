const jwt = require('jsonwebtoken');
const {getNamespace} = require('cls-hooked');

module.exports = function (req, res, next) {
    if(req.method === 'OPTIONS'){
        next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'User is not authorized'});
        }

        const clsNamespace = getNamespace('my-app-namespace');

        const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
        clsNamespace.set('userRole', decodedUser.role);

        next();
    }catch (e){
        console.log(e)
        res.status(401).json({message: 'User is not authorized'});
    }
}
