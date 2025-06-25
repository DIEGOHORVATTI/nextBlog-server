"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _httpstatuscodes = require("http-status-codes");
const exception = (err, req, res, _next)=>{
    const status = err.status || _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Internal Server Error';
    const details = err.details;
    res.status(status).json({
        error: message,
        ...details && {
            details
        }
    });
};
const _default = exception;
