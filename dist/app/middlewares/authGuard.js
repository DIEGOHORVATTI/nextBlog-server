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
const _jwtHelper = require("../../helpers/jwtHelper");
const _config = /*#__PURE__*/ _interop_require_default(require("../../config/config"));
const _HTTPError = require("../errors/HTTPError");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authGuard = (...roles)=>{
    return (req, _res, next)=>{
        const token = req.headers.authorization;
        if (!token) {
            throw new _HTTPError.HTTPError(_httpstatus.default.UNAUTHORIZED, 'You are not authorized');
        }
        try {
            const verifiedUser = _jwtHelper.jwtHelpers.verifyToken(token, _config.default.jwt.jwt_secret);
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new _HTTPError.HTTPError(_httpstatus.default.UNAUTHORIZED, "You don't have the permission");
            }
            req.user = verifiedUser;
            next();
        } catch (error) {
            next(error);
        }
    };
};
const _default = authGuard;
