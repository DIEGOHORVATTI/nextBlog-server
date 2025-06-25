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
    get comparePassword () {
        return comparePassword;
    },
    get generateToken () {
        return generateToken;
    },
    get hashPassword () {
        return hashPassword;
    },
    get verifyToken () {
        return verifyToken;
    }
});
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _config = require("../constants/config");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const generateToken = (user)=>{
    const jwtSignOptions = {
        expiresIn: _config.JWT_EXPIRES_IN_DAYS
    };
    return _jsonwebtoken.default.sign(user, _config.JWT_SECRET, jwtSignOptions);
};
const verifyToken = (token)=>_jsonwebtoken.default.verify(token, _config.JWT_SECRET);
const hashPassword = async (password)=>_bcryptjs.default.hash(password, 12);
const comparePassword = async (password, hashedPassword)=>_bcryptjs.default.compare(password, hashedPassword);
