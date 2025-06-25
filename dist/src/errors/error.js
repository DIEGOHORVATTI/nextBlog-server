"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "error", {
    enumerable: true,
    get: function() {
        return error;
    }
});
const _httpstatuscodes = require("http-status-codes");
const error = (code, { error: errorMsg, details })=>{
    const status = _httpstatuscodes.StatusCodes[code];
    const err = new Error(errorMsg);
    err.name = (0, _httpstatuscodes.getReasonPhrase)(status);
    err.stack = details || '';
    Object.assign(err, {
        status,
        details
    });
    throw err;
};
