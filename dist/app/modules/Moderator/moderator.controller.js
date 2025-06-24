"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModeratorController", {
    enumerable: true,
    get: function() {
        return ModeratorController;
    }
});
const _sendResponse = require("../../../shared/sendResponse");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _filterValidQueryParams = require("../../../shared/filterValidQueryParams");
const _appConstants = require("../../../shared/appConstants");
const _authorconstant = require("../Author/author.constant");
const _moderatorservice = require("./moderator.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getAllModerator = (0, _catchAsync.default)(async (req, res)=>{
    const validQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _authorconstant.authorValidParams);
    const paginationAndSortingQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _appConstants.paginationAndSortingParams);
    const result = await _moderatorservice.ModeratorService.getAllModeratorFomDB(validQueryParams, paginationAndSortingQueryParams);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Moderator data fetched!',
        meta: result.meta,
        data: result.result
    });
});
const getSingleModerator = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _moderatorservice.ModeratorService.getSingleModeratorFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Moderator data fetched successfully!',
        data: result
    });
});
const updateModerator = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _moderatorservice.ModeratorService.updateModeratorIntoDB(id, req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Moderator data updated successfully!',
        data: result
    });
});
const deleteModerator = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _moderatorservice.ModeratorService.deleteModeratorFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Moderator data deleted successfully!',
        data: result
    });
});
const softDeleteModerator = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _moderatorservice.ModeratorService.softDeleteModeratorFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Moderator data deleted!',
        data: result
    });
});
const ModeratorController = {
    getAllModerator,
    getSingleModerator,
    updateModerator,
    deleteModerator,
    softDeleteModerator
};
