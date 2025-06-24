"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagControllers", {
    enumerable: true,
    get: function() {
        return TagControllers;
    }
});
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _sendResponse = require("../../../shared/sendResponse");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _tagservice = require("./tag.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const addTag = (0, _catchAsync.default)(async (req, res)=>{
    const result = await _tagservice.TagServices.addTag(req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Tag created  successfully!',
        data: result
    });
});
const getAllTags = (0, _catchAsync.default)(async (req, res)=>{
    const result = await _tagservice.TagServices.getAllTags();
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Tag created  successfully!',
        data: result
    });
});
const TagControllers = {
    addTag,
    getAllTags
};
