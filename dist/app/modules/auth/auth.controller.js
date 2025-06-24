"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authController", {
    enumerable: true,
    get: function() {
        return authController;
    }
});
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _sendResponse = require("../../../shared/sendResponse");
const _authservices = require("./auth.services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const loginUser = (0, _catchAsync.default)(async (req, res)=>{
    const result = await _authservices.authServices.loginUser(req.body);
    const { refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true
    });
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Logged in successfully!',
        data: {
            accessToken: result.accessToken,
            passwordChangeRequired: result.passwordChangeRequired
        }
    });
});
const refreshToken = (0, _catchAsync.default)(async (req, res)=>{
    const { refreshToken } = req.cookies;
    console.log(refreshToken, 'refreshToken');
    const result = await _authservices.authServices.refreshToken(refreshToken);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Refresh  token generated successfully!',
        data: result
    });
});
const changePassword = (0, _catchAsync.default)(async (req, res)=>{
    const user = req.user;
    const payload = req.body;
    const result = await _authservices.authServices.changePassword(user, payload);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Password changed successfully!',
        data: {
            status: 200,
            message: 'Password changed successfully!'
        }
    });
});
const forgotPassword = (0, _catchAsync.default)(async (req, res)=>{
    const result = await _authservices.authServices.forgotPassword(req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Check your email to reset your password',
        data: {
            status: 200,
            message: 'Check your email for reset link!'
        }
    });
});
const resetPassword = (0, _catchAsync.default)(async (req, res)=>{
    const token = req.headers.authorization || '';
    console.log({
        token
    });
    const result = await _authservices.authServices.resetPassword(req.body, token);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Password reset successfully!',
        data: {
            status: 200,
            message: 'Password Reset Successfully'
        }
    });
});
const authController = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPassword,
    resetPassword
};
