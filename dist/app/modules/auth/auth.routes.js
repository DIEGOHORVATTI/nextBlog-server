"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authRoutes", {
    enumerable: true,
    get: function() {
        return authRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _authcontroller = require("./auth.controller");
const _authGuard = /*#__PURE__*/ _interop_require_default(require("../../middlewares/authGuard"));
const _client = require("@prisma/client");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.post('/login', _authcontroller.authController.loginUser);
router.post('/refresh-token', _authcontroller.authController.refreshToken);
router.post('/change-password', (0, _authGuard.default)(_client.UserRole.SUPER_ADMIN, _client.UserRole.ADMIN, _client.UserRole.BLOGGER, _client.UserRole.MODERATOR), _authcontroller.authController.changePassword);
router.post('/forgot-password', _authcontroller.authController.forgotPassword);
router.post('/reset-password', _authcontroller.authController.resetPassword);
const authRoutes = router;
