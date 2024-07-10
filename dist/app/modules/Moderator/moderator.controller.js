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
exports.ModeratorController = void 0;
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const filterValidQueryParams_1 = require("../../../shared/filterValidQueryParams");
const appConstants_1 = require("../../../shared/appConstants");
const author_constant_1 = require("../Author/author.constant");
const moderator_service_1 = require("./moderator.service");
const getAllModerator = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, author_constant_1.authorValidParams);
    const paginationAndSortingQueryParams = (0, filterValidQueryParams_1.filterValidQueryParams)(req.query, appConstants_1.paginationAndSortingParams);
    const result = yield moderator_service_1.ModeratorService.getAllModeratorFomDB(validQueryParams, paginationAndSortingQueryParams);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Moderator data fetched!',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleModerator = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield moderator_service_1.ModeratorService.getSingleModeratorFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Moderator data fetched successfully!',
        data: result,
    });
}));
const updateModerator = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield moderator_service_1.ModeratorService.updateModeratorIntoDB(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Moderator data updated successfully!',
        data: result,
    });
}));
const deleteModerator = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield moderator_service_1.ModeratorService.deleteModeratorFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Moderator data deleted successfully!',
        data: result,
    });
}));
const softDeleteModerator = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield moderator_service_1.ModeratorService.softDeleteModeratorFromDB(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Moderator data deleted!',
        data: result,
    });
}));
exports.ModeratorController = {
    getAllModerator,
    getSingleModerator,
    updateModerator,
    deleteModerator,
    softDeleteModerator,
};
