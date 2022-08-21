class APIError extends Error {
    constructor(status, message) {
        super();
        this.success = false;
        this.status = status;
        this.message = message;
    }

    static badRequest(msg) {
        return new APIError(400, msg);
    }

    static conflict(msg) {
        return new APIError(409, msg);
    }

    static noContent(msg) {
        return new APIError(404, msg);
    }

    static notFound(msg) {
        return new APIError(404, msg);
    }

    static unauthorized(msg) {
        return new APIError(401, msg);
    }

    static internal(msg) {
        return new APIError(500, msg);
    }
}

module.exports = APIError;
