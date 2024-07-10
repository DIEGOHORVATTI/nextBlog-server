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
exports.CommentServices = void 0;
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
const createCommentIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const userData = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email
        },
    });
    const blogData = yield prismaClient_1.default.blog.findUniqueOrThrow({
        where: {
            id: payload.blogId,
            authorId: payload.authorId,
        },
    });
    const result = yield prismaClient_1.default.comment.create({
        data: Object.assign(Object.assign({}, payload), { commentorId: userData.id }),
    });
    return result;
});
const updateCommentIntoDb = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const commentorData = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    yield prismaClient_1.default.comment.findUniqueOrThrow({
        where: {
            id,
            commentorId: commentorData.id,
        },
    });
    const result = yield prismaClient_1.default.comment.update({
        where: {
            id,
        },
        data: payload
    });
    return result;
});
const deleteCommentFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });
    yield prismaClient_1.default.comment.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield prismaClient_1.default.comment.delete({
        where: {
            id
        }
    });
    console.log(result);
    return result;
});
const getAllCommentsFromDB = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.blog.findUniqueOrThrow({
        where: {
            id: blogId
        }
    });
    const result = yield prismaClient_1.default.comment.findMany({
        where: {
            blogId: blogId
        },
        include: {
            comment: true,
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    return result;
});
const getSingleCommentFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });
    const result = yield prismaClient_1.default.comment.findFirstOrThrow({
        where: {
            id,
            commentorId: user.id
        }
    });
    return result;
});
exports.CommentServices = {
    createCommentIntoDB,
    updateCommentIntoDb,
    deleteCommentFromDB,
    getAllCommentsFromDB,
    getSingleCommentFromDB
};
