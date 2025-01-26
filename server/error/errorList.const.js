const ErrorList = {
    UNAUTHORIZED: {
        code: 401,
        message: 'User is not authorized'
    },
    WRONG_ROLE: {
        code: 403,
        message: 'You haven\'t got permission'
    }
}

module.exports = {ErrorList};
