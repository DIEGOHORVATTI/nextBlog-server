"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HTTPError", {
    enumerable: true,
    get: function() {
        return HTTPError;
    }
});
class HTTPError extends Error {
    statusCode;
    constructor(statusCode, message, stack = ''){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.stack = stack;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
