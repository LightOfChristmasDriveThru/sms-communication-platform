class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message);
        this.statusCode = 404;
    }
}

class ValidationError extends CustomError {
    constructor(message = 'Validation failed') {
        super(message);
        this.statusCode = 400;
    }
}

class AuthError extends CustomError {
    constructor(message = 'Authentication error') {
        super(message);
        this.statusCode = 401;
    }
}

module.exports = {
    CustomError,
    NotFoundError,
    ValidationError,
    AuthError,
};