class CustomError extends Error{
    constructor(error) {
        super();
        this.statusCode = error.code;
        this.message = error.message;
    }
}

module.exports = CustomError;
