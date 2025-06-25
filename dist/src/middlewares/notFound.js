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
const _result = require("../lib/result");
const notFound = (req, res, next)=>{
    next((0, _result.error)('NOT_FOUND', 'Resource not found'));
};
const _default = notFound;
