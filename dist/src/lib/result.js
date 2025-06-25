"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get err () {
        return err;
    },
    get error () {
        return error;
    },
    get match () {
        return match;
    },
    get ok () {
        return ok;
    }
});
const _httpstatuscodes = require("http-status-codes");
const ok = (value)=>({
        ok: true,
        value
    });
const err = (error)=>({
        ok: false,
        error
    });
const match = (result, handlers)=>result.ok ? handlers.ok(result.value) : handlers.err(result.error);
class HttpError extends Error {
    status;
    details;
    constructor({ code, message, details }){
        const status = _httpstatuscodes.StatusCodes[code];
        super(message);
        this.name = (0, _httpstatuscodes.getReasonPhrase)(status);
        this.status = status;
        this.details = details;
        this.stack = details;
    }
}
const error = (code, error, details)=>new HttpError({
        code,
        message: error,
        details
    });
