"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "blogController", {
    enumerable: true,
    get: function() {
        return blogController;
    }
});
const _sendResponse = require("../../../shared/sendResponse");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _catchAsync = /*#__PURE__*/ _interop_require_default(require("../../../shared/catchAsync"));
const _blogservice = require("./blog.service");
const _filterValidQueryParams = require("../../../shared/filterValidQueryParams");
const _appConstants = require("../../../shared/appConstants");
const _blogconstant = require("./blog.constant");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createBlog = (0, _catchAsync.default)(async (req, res)=>{
    const user = req.user;
    console.log(user);
    const data = req.body;
    const result = await _blogservice.blogServicres.craeteBlogIntoDb(data, user);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.CREATED,
        success: true,
        message: 'Blog Created Successfully!',
        data: result
    });
});
const getAllBlogs = (0, _catchAsync.default)(async (req, res)=>{
    const validQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _blogconstant.blogValidParams);
    const paginationAndSortingQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _appConstants.paginationAndSortingParams);
    const result = await _blogservice.blogServicres.getAllBlogFomDB(validQueryParams, paginationAndSortingQueryParams);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Blog data fetched successfully!',
        meta: result.meta,
        data: result.result
    });
});
const getAllBlogsForAdmin = (0, _catchAsync.default)(async (req, res)=>{
    const validQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _blogconstant.blogValidParams);
    const paginationAndSortingQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _appConstants.paginationAndSortingParams);
    const result = await _blogservice.blogServicres.getAllBlogsForAdmin(validQueryParams, paginationAndSortingQueryParams);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Blog data fetched successfully!',
        meta: result.meta,
        data: result.result
    });
});
const getSingleBlog = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const user = req.user;
    const result = await _blogservice.blogServicres.getSingleBlogFromDB(id, user);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Blog data fetched successfully!',
        data: result
    });
});
const getMyAllBlogs = (0, _catchAsync.default)(async (req, res)=>{
    const user = req.user;
    console.log(user);
    const validQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _blogconstant.blogValidParams);
    const paginationAndSortingQueryParams = (0, _filterValidQueryParams.filterValidQueryParams)(req.query, _appConstants.paginationAndSortingParams);
    const result = await _blogservice.blogServicres.getMyAllBlogsFomDB(validQueryParams, paginationAndSortingQueryParams, user);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'My blogs data fetched successfully!',
        meta: result.meta,
        data: result.result
    });
});
const deleteBlog = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _blogservice.blogServicres.deleteBlogFromDB(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Blog data deleted successfully!',
        data: result
    });
});
const updateBlog = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _blogservice.blogServicres.updateBlogIntoDB(id, req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Blog data updated successfully!',
        data: result
    });
});
const changeApprovalStatusBlog = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _blogservice.blogServicres.changeApprovalStatusDB(id, req.body);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Approval status  updated successfully!',
        data: result
    });
});
const getSingleBlogBYModerator = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const result = await _blogservice.blogServicres.getSingleBlogBYModerator(id);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'Blog fetched successfully!',
        data: result
    });
});
const voteCount = (0, _catchAsync.default)(async (req, res)=>{
    const { id } = req.params;
    const { action } = req.body;
    console.log(id, action);
    const result = await _blogservice.blogServicres.countVote(id, action);
    (0, _sendResponse.sendResponse)(res, {
        statusCode: _httpstatus.default.OK,
        success: true,
        message: 'voting updated successfully',
        data: result
    });
});
const blogController = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    getMyAllBlogs,
    deleteBlog,
    updateBlog,
    changeApprovalStatusBlog,
    getSingleBlogBYModerator,
    voteCount,
    getAllBlogsForAdmin
};
