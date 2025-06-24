"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthorController", {
    enumerable: true,
    get: function() {
        return AuthorController;
    }
});
const _sendResponse = require("../../../shared/sendResponse");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _authorservice = require("./author.service");
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _filterValidQueryParams = require("../../../shared/filterValidQueryParams");
const _appConstants = require("../../../shared/appConstants");
const _authorconstant = require("./author.constant");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getAllAuthor = (0, _catchAsync.default)(async (req, res)=>{
    const validQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _authorconstant.authorValidParams);
    const paginationAndSortingQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _appConstants.paginationAndSortingParams);
    const result = await _authorservice.AuthorService.getAllAuthorFomDB(validQueryParams, paginationAndSortingQueryParams);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Author data fetched!',
        meta: result.meta,
        data: result.result
    });
});
const getSingleAuthor = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _authorservice.AuthorService.getSingleAuthorFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Author data fetched successfully!',
        data: result
    });
});
const updateAuthor = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _authorservice.AuthorService.updateAuthorIntoDB(id, req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Author data updated successfully!',
        data: result
    });
});
const deleteAuthor = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _authorservice.AuthorService.deleteAuthorFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Author data deleted successfully!',
        data: result
    });
});
const softDeleteAuthor = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _authorservice.AuthorService.softDeleteAuthorFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Author data deleted!',
        data: result
    });
});
const AuthorController = {
    getAllAuthor,
    getSingleAuthor,
    updateAuthor,
    deleteAuthor,
    softDeleteAuthor
};
