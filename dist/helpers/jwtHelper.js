"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "jwtHelpers", {
    enumerable: true,
    get: function() {
        return jwtHelpers;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const generateToken = (payload, secret, expiresIn)=>{
    const token = _jsonwebtoken.default.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn
    });
    return token;
};
const verifyToken = (token, secret)=>{
    return _jsonwebtoken.default.verify(token, secret);
};
const jwtHelpers = {
    generateToken,
    verifyToken
};
