const jwt = require('jsonwebtoken');
const {getNamespace} = require('cls-hooked');
const {ErrorList} = require("../error/errorList.const");
const CustomError = require("../error/customError");

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const clsNamespace = getNamespace('my-app-namespace');

            if (clsNamespace.get('userRole') === role) {
                throw new Error();
            }

            next();
        } catch (e) {
            console.log(ErrorList)
            throw new CustomError(ErrorList.WRONG_ROLE);
        }
    }


}
