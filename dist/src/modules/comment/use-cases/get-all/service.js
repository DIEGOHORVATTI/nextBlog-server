"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCommentsService", {
    enumerable: true,
    get: function() {
        return getCommentsService;
    }
});
const _result = require("../../../../lib/result");
const _prisma = require("../../../../lib/prisma");
const _paginate = require("../../../../shared/paginate");
const getCommentsService = async (postId, query)=>{
    const post = await _prisma.prisma.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        return (0, _result.error)('NOT_FOUND', 'Post not found');
    }
    const { data, ...meta } = await (0, _paginate.paginate)(async (skip, take)=>{
        const [comments, total] = await Promise.all([
            _prisma.prisma.comment.findMany({
                where: {
                    postId,
                    parentId: null
                },
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
                            avatarUrl: true
                        }
                    },
                    replies: {
                        orderBy: {
                            createdAt: 'asc'
                        },
                        include: {
                            author: {
                                select: {
                                    id: true,
                                    name: true,
                                    avatarUrl: true
                                }
                            },
                            _count: {
                                select: {
                                    replies: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            replies: true
                        }
                    }
                }
            }),
            _prisma.prisma.comment.count({
                where: {
                    postId,
                    parentId: null
                }
            })
        ]);
        return [
            comments,
            total
        ];
    }, query);
    return {
        comments: data.map((comment)=>({
                ...comment,
                replies: comment.replies.map((reply)=>({
                        ...reply,
                        hasReplies: reply._count.replies > 0
                    }))
            })),
        meta
    };
};
