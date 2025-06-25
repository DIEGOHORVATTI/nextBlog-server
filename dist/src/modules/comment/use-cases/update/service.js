"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateCommentService", {
    enumerable: true,
    get: function() {
        return updateCommentService;
    }
});
const _result = require("../../../../lib/result");
const _prisma = require("../../../../lib/prisma");
const updateCommentService = async (id, { content }, userId)=>{
    const existingComment = await _prisma.prisma.comment.findUnique({
        where: {
            id
        }
    });
    if (!existingComment) {
        return (0, _result.error)('NOT_FOUND', 'Comment not found');
    }
    if (existingComment.authorId !== userId) {
        return (0, _result.error)('FORBIDDEN', 'You can only update your own comments');
    }
    const comment = await _prisma.prisma.comment.update({
        where: {
            id
        },
        data: {
            content
        }
    });
    return comment;
};
