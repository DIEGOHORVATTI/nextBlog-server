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
const _client = require("@prisma/client");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const globalErrorhandler = (err, req, res, next)=>{
    let statusCode = _httpstatus.default.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || 'something went wrong';
    let error = err;
    if (err instanceof _client.Prisma.PrismaClientValidationError) {
        message = 'Validation Error', error = err.message;
    } else if (err instanceof _client.Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = 'Duplicate Key Error';
            error = err.meta;
        }
    }
    res.status(statusCode).json({
        success,
        message,
        error
    });
};
const _default = globalErrorhandler;
