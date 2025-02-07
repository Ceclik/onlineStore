const apiError = require('../error/apiError');

module.exports = function (req, res, err) {
    console.log("Loh " + err.message);
    if (err instanceof apiError) {
        return res.status(err.statusCode).json({message: err.message});
    }
    return res.status(500).json({message: "Unexpected error!"});
}