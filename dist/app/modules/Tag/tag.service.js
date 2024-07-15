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
exports.TagServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
const HTTPError_1 = require("../../errors/HTTPError");
const addTag = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const blogData = yield prismaClient_1.default.blog.findUnique({
        where: {
            id: data.blogId,
        },
    });
    if (!blogData) {
        throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, 'Blog not found');
    }
    const result = yield prismaClient_1.default.tag.create({
        data,
    });
    return result;
});
exports.TagServices = {
    addTag,
};
