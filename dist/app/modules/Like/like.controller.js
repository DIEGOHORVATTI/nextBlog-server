"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LikeControllers", {
    enumerable: true,
    get: function() {
        return LikeControllers;
    }
});
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _sendResponse = require("../../../shared/sendResponse");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _likeservice = require("./like.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const like = (0, _catchAsync.default)(async (req, res)=>{
    const { blogId } = req.params;
    const { userId } = req.body;
    console.log('user', blogId, userId);
    const result = await _likeservice.LikeServices.like(blogId, userId);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'like created  successfully!',
        data: result
    });
});
const LikeControllers = {
    like
};
