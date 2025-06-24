"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminController", {
    enumerable: true,
    get: function() {
        return AdminController;
    }
});
const _sendResponse = require("../../../shared/sendResponse");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _adminservice = require("./admin.service");
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _filterValidQueryParams = require("../../../shared/filterValidQueryParams");
const _adminconstants = require("./admin.constants");
const _appConstants = require("../../../shared/appConstants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getAllAdmin = (0, _catchAsync.default)(async (req, res)=>{
    const validQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _adminconstants.validParams);
    const paginationAndSortingQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _appConstants.paginationAndSortingParams);
    const result = await _adminservice.AdminService.getAllAdminFomDB(validQueryParams, paginationAndSortingQueryParams);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Admin data fetched!',
        meta: result.meta,
        data: result.result
    });
});
const getSingleAdmin = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _adminservice.AdminService.getSingleAdminFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Admin data fetched successfully!',
        data: result
    });
});
const updateAdmin = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _adminservice.AdminService.updateAdminIntoDB(id, req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Admin data updated successfully!',
        data: result
    });
});
const deleteAdmin = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _adminservice.AdminService.deleteAdminFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Admin data deleted successfully!',
        data: result
    });
});
const softDeleteAdmin = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _adminservice.AdminService.softDeleteAdminFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Admin data deleted!',
        data: result
    });
});
const AdminController = {
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
    softDeleteAdmin
};
