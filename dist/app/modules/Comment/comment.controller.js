"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentControllers", {
    enumerable: true,
    get: function() {
        return CommentControllers;
    }
});
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _sendResponse = require("../../../shared/sendResponse");
const _commentservice = require("./comment.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createComment = (0, _catchAsync.default)(async (req, res)=>{
    const user = req.user;
    const result = await _commentservice.CommentServices.createCommentIntoDB(user, req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Comment created successfully!',
        data: result
    });
});
const updateMyComment = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const user = req.user;
    const payload = req.body;
    console.log(payload);
    const result = await _commentservice.CommentServices.updateCommentIntoDb(id, req.body, user);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Comment updated successfully!',
        data: result
    });
});
const deleteComment = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const user = req.user;
    const result = await _commentservice.CommentServices.deleteCommentFromDB(id, user);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Delete comment  successfully!',
        data: result
    });
});
const getSingleComment = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const user = req.user;
    const result = await _commentservice.CommentServices.getSingleCommentFromDB(id, user);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Comment fetched  successfully!',
        data: result
    });
});
const getAllComments = (0, _catchAsync.default)(async (req, res)=>{
    const { blogId } = req.params;
    const result = await _commentservice.CommentServices.getAllCommentsFromDB(blogId);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Comments fetched successfully!',
        data: result
    });
});
const CommentControllers = {
    createComment,
    updateMyComment,
    deleteComment,
    getAllComments,
    getSingleComment
};
