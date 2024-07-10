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
exports.LikeServices = void 0;
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
const like = (blogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ blogId, userId });
    const userData = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
    });
    const existingLike = yield prismaClient_1.default.like.findFirst({
        where: {
            blogId: blogId,
            userId: userData.id,
        },
    });
    console.log(existingLike);
    if (existingLike) {
        return yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            const updatedBlog = yield tx.blog.update({
                where: {
                    id: blogId,
                },
                data: { likeCount: { decrement: 1 } },
            });
            return updatedBlog;
        }));
    }
    if (!existingLike) {
        return yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const createLike = yield tx.like.create({
                data: {
                    blogId: blogId,
                    userId: userId,
                },
            });
            const updatedBlog = yield tx.blog.update({
                where: {
                    id: blogId,
                },
                data: { likeCount: { increment: 1 } },
            });
            return updatedBlog;
        }));
    }
});
exports.LikeServices = {
    like,
};
