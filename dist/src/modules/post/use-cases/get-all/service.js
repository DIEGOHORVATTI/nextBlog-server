"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPostsService", {
    enumerable: true,
    get: function() {
        return getPostsService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _paginate = require("../../../../shared/paginate");
const getPostsService = async ({ page = 1, limit = 10, search, categoryId, published, authorId })=>{
    const where = {};
    if (search) {
        where.OR = [
            {
                title: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                content: {
                    contains: search,
                    mode: 'insensitive'
                }
            },
            {
                excerpt: {
                    contains: search,
                    mode: 'insensitive'
                }
            }
        ];
    }
    if (categoryId) {
        where.categoryId = categoryId;
    }
    if (published !== undefined) {
        where.publishedAt = published ? {
            not: null
        } : null;
    }
    if (authorId) {
        where.authorId = authorId;
    }
    const { data, ...meta } = await (0, _paginate.paginate)(async (skip, take)=>{
        const [posts, total] = await Promise.all([
            _prisma.prisma.post.findMany({
                where,
                skip,
                take,
                orderBy: {
                    createdAt: 'desc'
                },
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    _count: {
                        select: {
                            comments: true,
                            likes: true
                        }
                    }
                }
            }),
            _prisma.prisma.post.count({
                where
            })
        ]);
        return [
            posts,
            total
        ];
    }, {
        page,
        limit
    });
    return {
        posts: data,
        meta
    };
};
