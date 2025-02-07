const { errorList } = require('./errorList.const');

class ApiError extends Error {
    constructor(statusCode, message) {
        console.log(`in api error constructor. Message: ${message}`);
        super(message);
        this.statusCode = statusCode;

    }

    static fromError(errorType) {
        if (!errorList[errorType]) {
            throw new Error(`Unknown error type: ${errorType}`);
        }
        return new ApiError(errorList[errorType].code, errorList[errorType].message);
    }

    static badRequest(message = errorList.BAD_REQUEST.message) {
        return new ApiError(errorList.BAD_REQUEST.code, message);
    }

    static internal(message = errorList.INTERNAL.message) {
        return new ApiError(errorList.INTERNAL.code, message);
    }

    static forbidden(message = errorList.WRONG_ROLE.message) {
        return new ApiError(errorList.WRONG_ROLE.code, message);
    }

    static unauthorized(message = errorList.UNAUTHORIZED.message) {
        return new ApiError(errorList.UNAUTHORIZED.code, message);
    }

    static notFound(message = errorList.NOT_FOUND.message) {
        return new ApiError(errorList.NOT_FOUND.code, message);
    }
}

module.exports = ApiError;
