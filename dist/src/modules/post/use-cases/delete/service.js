"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deletePostService", {
    enumerable: true,
    get: function() {
        return deletePostService;
    }
});
const _result = require("../../../../lib/result");
const _prisma = require("../../../../lib/prisma");
const deletePostService = async (id, userId)=>{
    const existingPost = await _prisma.prisma.post.findUnique({
        where: {
            id
        }
    });
    if (!existingPost) {
        return (0, _result.error)('NOT_FOUND', 'Post not found');
    }
    if (existingPost.authorId !== userId) {
        return (0, _result.error)('FORBIDDEN', 'Access denied');
    }
    await _prisma.prisma.post.delete({
        where: {
            id
        }
    });
    return {
        message: 'Post deleted successfully',
        deletedId: id
    };
};
