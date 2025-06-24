"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LikeServices", {
    enumerable: true,
    get: function() {
        return LikeServices;
    }
});
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const like = async (blogId, userId)=>{
    console.log({
        blogId,
        userId
    });
    const userData = await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            id: userId
        }
    });
    const existingLike = await _prismaClient.default.like.findFirst({
        where: {
            blogId: blogId,
            userId: userData.id
        }
    });
    console.log(existingLike);
    if (existingLike) {
        return await _prismaClient.default.$transaction(async (tx)=>{
            await tx.like.delete({
                where: {
                    id: existingLike.id
                }
            });
            const updatedBlog = await tx.blog.update({
                where: {
                    id: blogId
                },
                data: {
                    likeCount: {
                        decrement: 1
                    }
                }
            });
            return updatedBlog;
        });
    }
    if (!existingLike) {
        return await _prismaClient.default.$transaction(async (tx)=>{
            const createLike = await tx.like.create({
                data: {
                    blogId: blogId,
                    userId: userId
                }
            });
            const updatedBlog = await tx.blog.update({
                where: {
                    id: blogId
                },
                data: {
                    likeCount: {
                        increment: 1
                    }
                }
            });
            return updatedBlog;
        });
    }
};
const LikeServices = {
    like
};
