"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogController = void 0;
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const blog_service_1 = require("./blog.service");
const filterValidQueryParams_1 = require("../../../shared/filterValidQueryParams");
const appConstants_1 = require("../../../shared/appConstants");
const blog_constant_1 = require("./blog.constant");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    const data = req.body;
    const result = yield blog_service_1.blogServicres.craeteBlogIntoDb(data, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Blog Created Successfully!",
        data: result,
    });
}));
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, blog_constant_1.blogValidParams);
    const paginationAndSortingQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, appConstants_1.paginationAndSortingParams);
    const result = yield blog_service_1.blogServicres.getAllBlogFomDB(validQueryParams, paginationAndSortingQueryParams);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog data fetched successfully!",
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user;
    const result = yield blog_service_1.blogServicres.getSingleBlogFromDB(id, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog data fetched successfully!",
        data: result,
    });
}));
const getMyAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    const validQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, blog_constant_1.blogValidParams);
    const paginationAndSortingQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, appConstants_1.paginationAndSortingParams);
    const result = yield blog_service_1.blogServicres.getMyAllBlogsFomDB(validQueryParams, paginationAndSortingQueryParams, user);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "My blogs data fetched successfully!",
        meta: result.meta,
        data: result.result,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blogServicres.deleteBlogFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog data deleted successfully!",
        data: result,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blogServicres.updateBlogIntoDB(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog data updated successfully!",
        data: result,
    });
}));
const changeApprovalStatusBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blogServicres.changeApprovalStatusDB(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Approval status  updated successfully!",
        data: result,
    });
}));
const getSingleBlogBYModerator = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blogServicres.getSingleBlogBYModerator(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Blog fetched successfully!",
        data: result,
    });
}));
exports.blogController = {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    getMyAllBlogs,
    deleteBlog,
    updateBlog,
    changeApprovalStatusBlog,
    getSingleBlogBYModerator
};
