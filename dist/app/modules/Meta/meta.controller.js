"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetaController", {
    enumerable: true,
    get: function() {
        return MetaController;
    }
});
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _metaservice = require("./meta.service");
const _sendResponse = require("../../../shared/sendResponse");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const fetchDashboardMetadata = (0, _catchAsync.default)(async (req, res)=>{
    const user = req.user;
    const result = await _metaservice.metaServices.fetchDashboardMetadata(user);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Meta data fetched successfully',
        data: result
    });
});
const MetaController = {
    fetchDashboardMetadata
};
