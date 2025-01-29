const apiError = require('../error/apiError');

module.exports = function (err, req, res) {
    if (err instanceof apiError) {
        console.log(err);
        return res.status(err.statusCode).json({message: err.message});
    }
    return res.status(500).json({message: "Unexpected error!"});
}