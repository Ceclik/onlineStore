const apiError = require('../error/apiError');
const CustomError = require("../error/customError");

module.exports = function (err, req, res, next) {
    if (err instanceof apiError) {
        return res.status(err.statusCode).json({ message: err.message });
    } else if (err instanceof CustomError) {
        console.log(err);
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: "Unexpected error!" });
};
