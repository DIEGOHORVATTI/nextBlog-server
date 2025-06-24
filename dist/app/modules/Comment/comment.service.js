"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentServices", {
    enumerable: true,
    get: function() {
        return CommentServices;
    }
});
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createCommentIntoDB = async (user, payload)=>{
    console.log(user);
    const userData = await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            email: user?.email
        }
    });
    const blogData = await _prismaClient.default.blog.findUniqueOrThrow({
        where: {
            id: payload.blogId,
            authorId: payload.authorId
        }
    });
    const result = await _prismaClient.default.comment.create({
        data: {
            ...payload,
            commentorId: userData.id
        }
    });
    return result;
};
const updateCommentIntoDb = async (id, payload, user)=>{
    console.log(payload);
    const commentorData = await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });
    await _prismaClient.default.comment.findUniqueOrThrow({
        where: {
            id,
            commentorId: commentorData.id
        }
    });
    const result = await _prismaClient.default.comment.update({
        where: {
            id
        },
        data: payload
    });
    return result;
};
const deleteCommentFromDB = async (id, user)=>{
    await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });
    await _prismaClient.default.comment.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = await _prismaClient.default.comment.delete({
        where: {
            id
        }
    });
    console.log(result);
    return result;
};
const getAllCommentsFromDB = async (blogId)=>{
    await _prismaClient.default.blog.findUniqueOrThrow({
        where: {
            id: blogId
        }
    });
    const result = await _prismaClient.default.comment.findMany({
        where: {
            blogId: blogId
        },
        include: {
            comment: true
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    return result;
};
const getSingleCommentFromDB = async (id, user)=>{
    await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });
    const result = await _prismaClient.default.comment.findFirstOrThrow({
        where: {
            id,
            commentorId: user.id
        }
    });
    return result;
};
const CommentServices = {
    createCommentIntoDB,
    updateCommentIntoDb,
    deleteCommentFromDB,
    getAllCommentsFromDB,
    getSingleCommentFromDB
};
