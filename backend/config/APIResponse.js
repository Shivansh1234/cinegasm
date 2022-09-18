class APIResponse {
    constructor(status, message, data) {
        this.success = true;
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static created(msg, data) {
        return new APIResponse(201, msg, data);
    }

    static get(msg, data) {
        return new APIResponse(200, msg, data);
    }

    static deleted(msg, data) {
        return new APIResponse(204, msg, data);
    }
}

module.exports = APIResponse;
