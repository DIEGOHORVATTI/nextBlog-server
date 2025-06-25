"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updatePostService", {
    enumerable: true,
    get: function() {
        return updatePostService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _error = require("../../../../errors/error");
const updatePostService = async (id, userId, { categoryId, title, content, excerpt, coverUrl, tags, published })=>{
    // Check if post exists and user is the author
    const existingPost = await _prisma.prisma.post.findUnique({
        where: {
            id
        }
    });
    if (!existingPost) {
        return (0, _error.error)('NOT_FOUND', {
            error: 'Post not found',
            details: 'The requested post does not exist'
        });
    }
    if (existingPost.authorId !== userId) {
        return (0, _error.error)('FORBIDDEN', {
            error: 'Access denied',
            details: 'You can only update your own posts'
        });
    }
    // Check if category exists
    if (categoryId) {
        const category = await _prisma.prisma.category.findUnique({
            where: {
                id: categoryId
            }
        });
        if (!category) {
            (0, _error.error)('NOT_FOUND', {
                error: 'Category not found',
                details: 'The specified category does not exist'
            });
        }
    }
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (coverUrl !== undefined) updateData.coverUrl = coverUrl;
    if (tags !== undefined) updateData.tags = tags;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (published !== undefined) updateData.published = published;
    const post = await _prisma.prisma.post.update({
        where: {
            id
        },
        data: updateData
    });
    return post;
};
