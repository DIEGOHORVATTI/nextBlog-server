"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCommentService", {
    enumerable: true,
    get: function() {
        return createCommentService;
    }
});
const _result = require("../../../../lib/result");
const _prisma = require("../../../../lib/prisma");
const createCommentService = async (authorId, { content, postId, parentId })=>{
    const post = await _prisma.prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        return (0, _result.error)('NOT_FOUND', 'Post not found');
    }
    // Check if parent comment exists (if provided)
    if (parentId) {
        const parentComment = await _prisma.prisma.comment.findUnique({
            where: {
                id: parentId
            }
        });
        if (!parentComment) {
            return (0, _result.error)('NOT_FOUND', 'Parent comment not found');
        }
        if (parentComment.postId !== postId) {
            return (0, _result.error)('BAD_REQUEST', 'Invalid parent comment');
        }
    }
    const comment = await _prisma.prisma.comment.create({
        data: {
            content,
            postId,
            parentId,
            authorId
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    avatarUrl: true
                }
            }
        }
    });
    return comment;
};
