"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createPostService", {
    enumerable: true,
    get: function() {
        return createPostService;
    }
});
const _result = require("../../../../lib/result");
const _prisma = require("../../../../lib/prisma");
const createPostService = async (authorId, { categoryId, publishedAt, tags, visibility = 'PUBLIC', ...rest })=>{
    if (categoryId) {
        const category = await _prisma.prisma.category.findUnique({
            where: {
                id: categoryId
            }
        });
        if (!category) {
            return (0, _result.error)('NOT_FOUND', 'Categoria não encontrada');
        }
    }
    const post = await _prisma.prisma.post.create({
        data: {
            ...rest,
            authorId,
            publishedAt: publishedAt ? new Date() : undefined,
            tags: {
                connect: tags?.map((id)=>({
                        id
                    }))
            }
        },
        include: {
            tags: true
        }
    });
    return post;
};
