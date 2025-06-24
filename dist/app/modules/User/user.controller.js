"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userController", {
    enumerable: true,
    get: function() {
        return userController;
    }
});
const _sendResponse = require("../../../shared/sendResponse");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _userservice = require("./user.service");
const _filterValidQueryParams = require("../../../shared/filterValidQueryParams");
const _userconstant = require("./user.constant");
const _appConstants = require("../../../shared/appConstants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createAdmin = (0, _catchAsync.default)(async (req, res)=>{
    const result = await _userservice.userServices.createAdmin(req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Admin created successfully!',
        data: result
    });
});
const createAuthor = (0, _catchAsync.default)(async (req, res)=>{
    const result = await _userservice.userServices.createAuthor(req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Author created successfully!',
        data: result
    });
});
const createModarator = (0, _catchAsync.default)(async (req, res)=>{
    const result = await _userservice.userServices.createModarator(req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Modarator created successfully!',
        data: result
    });
});
const createSubscriber = (0, _catchAsync.default)(async (req, res)=>{
    const result = await _userservice.userServices.createSubscriber(req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Subscriber created successfully!',
        data: result
    });
});
const getAllUsers = (0, _catchAsync.default)(async (req, res)=>{
    const user = req.user;
    const validQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _userconstant.userValidParams);
    const paginationAndSortingQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _appConstants.paginationAndSortingParams);
    const result = await _userservice.userServices.getAllUsersFromDb(validQueryParams, paginationAndSortingQueryParams, user);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Users data fetched!',
        meta: result.meta,
        data: result.result
    });
});
const getMyProfile = (0, _catchAsync.default)(async (req, res)=>{
    const user = req.user;
    const result = await _userservice.userServices.getMyProfile(user);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Profile data fetched!',
        data: result
    });
});
const updateMyProfile = (0, _catchAsync.default)(async (req, res)=>{
    const user = req.user;
    console.log();
    const result = await _userservice.userServices.updateMyProfile(user, req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Profile updated successfully!!',
        data: result
    });
});
const changeProfileStatus = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _userservice.userServices.changeProfileStatus(id, req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'User status updated successfully!',
        data: result
    });
});
const userController = {
    createAdmin,
    createAuthor,
    createModarator,
    createSubscriber,
    getAllUsers,
    getMyProfile,
    updateMyProfile,
    changeProfileStatus
};
