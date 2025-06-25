"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPostService", {
    enumerable: true,
    get: function() {
        return getPostService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _error = require("../../../../errors/error");
const getPostService = async (id)=>{
    const post = await _prisma.prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    avatarUrl: true
                }
            },
            category: {
                select: {
                    id: true,
                    name: true,
                    description: true
                }
            },
            comments: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 10,
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            avatarUrl: true
                        }
                    }
                }
            },
            _count: {
                select: {
                    comments: true,
                    likes: true
                }
            }
        }
    });
    if (!post) {
        return (0, _error.error)('NOT_FOUND', {
            error: 'Post not found',
            details: 'The requested post does not exist'
        });
    }
    return post;
};
