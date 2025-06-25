"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteCommentService", {
    enumerable: true,
    get: function() {
        return deleteCommentService;
    }
});
const _result = require("../../../../lib/result");
const _prisma = require("../../../../lib/prisma");
const deleteCommentService = async (id, userId)=>{
    const existingComment = await _prisma.prisma.comment.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    replies: true
                }
            }
        }
    });
    if (!existingComment) {
        return (0, _result.error)('NOT_FOUND', 'Comment not found');
    }
    if (existingComment.authorId !== userId) {
        return (0, _result.error)('FORBIDDEN', 'Access denied');
    }
    return await _prisma.prisma.comment.delete({
        where: {
            id
        }
    });
};
