"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "blogServicres", {
    enumerable: true,
    get: function() {
        return blogServicres;
    }
});
const _client = require("@prisma/client");
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
const _paginationHelpers = require("../../../helpers/paginationHelpers");
const _blogconstant = require("./blog.constant");
const _HTTPError = require("../../errors/HTTPError");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const craeteBlogIntoDb = async (payload, user)=>{
    console.log({
        user
    });
    const authorData = await _prismaClient.default.author.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });
    const result = await _prismaClient.default.blog.create({
        data: {
            ...payload,
            authorId: authorData.id
        }
    });
    return result;
};
const getAllBlogFomDB = async (queryParams, paginationAndSortingQueryParams)=>{
    const { q, tag, ...otherQueryParams } = queryParams; // Destructure tag from queryParams
    const { limit, skip, page, sortBy, sortOrder } = (0, _paginationHelpers.generatePaginateAndSortOptions)({
        ...paginationAndSortingQueryParams
    });
    const conditions = [];
    // filtering out the soft deleted users
    conditions.push({
        visibility: _client.Visibility.PUBLIC,
        publishedStatus: _client.Published_status.APPROVED
    });
    // Searching
    if (q) {
        const searchConditions = _blogconstant.blogSearchableFields.map((field)=>({
                [field]: {
                    contains: q,
                    mode: 'insensitive'
                }
            }));
        conditions.push({
            OR: searchConditions
        });
    }
    // Filtering with exact value
    if (Object.keys(otherQueryParams).length > 0) {
        const filterData = Object.keys(otherQueryParams).map((key)=>({
                [key]: otherQueryParams[key]
            }));
        conditions.push(...filterData);
    }
    // Filtering by tag name
    if (tag) {
        conditions.push({
            tag: {
                some: {
                    name: {
                        contains: tag,
                        mode: 'insensitive'
                    }
                }
            }
        });
    }
    const result = await _prismaClient.default.blog.findMany({
        where: {
            AND: conditions
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            author: true,
            tag: true
        }
    });
    const total = await _prismaClient.default.blog.count({
        where: {
            AND: conditions
        }
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        result
    };
};
const getAllBlogsForAdmin = async (queryParams, paginationAndSortingQueryParams)=>{
    const { q, tag, ...otherQueryParams } = queryParams; // Destructure tag from queryParams
    const { limit, skip, page, sortBy, sortOrder } = (0, _paginationHelpers.generatePaginateAndSortOptions)({
        ...paginationAndSortingQueryParams
    });
    const conditions = [];
    // filtering out the soft deleted users
    conditions.push({
        visibility: _client.Visibility.PUBLIC
    });
    // Searching
    if (q) {
        const searchConditions = _blogconstant.blogSearchableFields.map((field)=>({
                [field]: {
                    contains: q,
                    mode: 'insensitive'
                }
            }));
        conditions.push({
            OR: searchConditions
        });
    }
    // Filtering with exact value
    if (Object.keys(otherQueryParams).length > 0) {
        const filterData = Object.keys(otherQueryParams).map((key)=>({
                [key]: otherQueryParams[key]
            }));
        conditions.push(...filterData);
    }
    // Filtering by tag name
    if (tag) {
        conditions.push({
            tag: {
                some: {
                    name: {
                        contains: tag,
                        mode: 'insensitive'
                    }
                }
            }
        });
    }
    const result = await _prismaClient.default.blog.findMany({
        where: {
            AND: conditions
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            author: true,
            tag: true
        }
    });
    const total = await _prismaClient.default.blog.count({
        where: {
            AND: conditions
        }
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        result
    };
};
const getSingleBlogFromDB = async (id, user)=>{
    console.log({
        user
    });
    const blogPost = await _prismaClient.default.$transaction(async (tx)=>{
        let includeOptions = {};
        const post = await tx.blog.findUnique({
            where: {
                id
            },
            include: {
                author: true,
                comment: true,
                tag: true
            }
        });
        // Increment views within the transaction
        await tx.blog.update({
            where: {
                id
            },
            data: {
                views: {
                    increment: 1
                }
            }
        });
        return post;
    });
    return blogPost;
};
const getMyAllBlogsFomDB = async (queryParams, paginationAndSortingQueryParams, user)=>{
    const userData = await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            id: user.userId
        }
    });
    const authorData = await _prismaClient.default.author.findUniqueOrThrow({
        where: {
            email: userData.email
        }
    });
    const { q, ...otherQueryParams } = queryParams;
    const { limit, skip, page, sortBy, sortOrder } = (0, _paginationHelpers.generatePaginateAndSortOptions)({
        ...paginationAndSortingQueryParams
    });
    //  const conditions: Prisma.BlogWhereInput[] = [];
    const conditions = [];
    // filtering out the soft deleted users
    conditions.push({
        visibility: _client.Visibility.PUBLIC
    });
    //@ searching
    if (q) {
        const searchConditions = _blogconstant.blogSearchableFields.map((field)=>({
                [field]: {
                    contains: q,
                    mode: 'insensitive'
                }
            }));
        conditions.push({
            OR: searchConditions
        });
    }
    //@ filtering with exact value
    if (Object.keys(otherQueryParams).length > 0) {
        const filterData = Object.keys(otherQueryParams).map((key)=>({
                [key]: otherQueryParams[key]
            }));
        conditions.push(...filterData);
    }
    const result = await _prismaClient.default.blog.findMany({
        where: {
            AND: [
                ...conditions,
                {
                    authorId: authorData.id
                }
            ]
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = await _prismaClient.default.blog.count({
        where: {
            AND: [
                ...conditions,
                {
                    authorId: authorData.id
                }
            ]
        }
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        result
    };
};
const deleteBlogFromDB = async (id)=>{
    // Use a Prisma transaction to ensure atomicity
    const result = await _prismaClient.default.$transaction(async (tx)=>{
        // Delete all comments associated with the blog
        await tx.comment.deleteMany({
            where: {
                blogId: id
            }
        });
        await tx.like.deleteMany({
            where: {
                blogId: id
            }
        });
        // Delete the blog
        const deleteBlog = await tx.blog.delete({
            where: {
                id
            }
        });
        // Return the deleted blog
        return deleteBlog;
    });
    return result;
};
const updateBlogIntoDB = async (id, data)=>{
    await _prismaClient.default.blog.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = await _prismaClient.default.blog.update({
        where: {
            id
        },
        data
    });
    return result;
};
const changeApprovalStatusDB = async (id, data)=>{
    await _prismaClient.default.blog.findUniqueOrThrow({
        where: {
            id
        }
    });
    const isCancel = await _prismaClient.default.blog.findUnique({
        where: {
            id,
            publishedStatus: _client.Published_status.CANCEL
        }
    });
    if (isCancel) {
        throw new _HTTPError.HTTPError(_httpstatus.default.BAD_REQUEST, 'Can not updated its status is cancel');
    }
    console.log(isCancel);
    const result = await _prismaClient.default.blog.update({
        where: {
            id,
            NOT: {
                publishedStatus: {
                    in: [
                        _client.Published_status.CANCEL
                    ]
                }
            }
        },
        data
    });
    return result;
};
const countVote = async (id, action)=>{
    console.log(id, action);
    // Find the blog post by its unique ID
    const blog = await _prismaClient.default.blog.findUnique({
        where: {
            id: id
        }
    });
    // Throw an error if the blog post is not found
    if (!blog) {
        throw new Error('Blog not found');
    }
    // Check if blog.votes is not null before updating
    if (blog.votes !== null) {
        // Update the votes based on the action
        if (action === 'upvote') {
            blog.votes += 1;
        } else if (action === 'downvote') {
            blog.votes -= 1;
        } else {
            throw new Error('Invalid action');
        }
    } else {
        throw new Error('Votes cannot be null');
    }
    // Save the updated blog post with the new vote count
    const updatedBlog = await _prismaClient.default.blog.update({
        where: {
            id: id
        },
        data: {
            votes: blog.votes
        }
    });
    return updatedBlog.votes;
};
const getSingleBlogBYModerator = async (id)=>{
    const blogData = await _prismaClient.default.blog.findUniqueOrThrow({
        where: {
            id
        },
        include: {
            author: true
        }
    });
    return blogData;
};
const blogServicres = {
    getAllBlogFomDB,
    craeteBlogIntoDb,
    getSingleBlogFromDB,
    getMyAllBlogsFomDB,
    deleteBlogFromDB,
    updateBlogIntoDB,
    changeApprovalStatusDB,
    getSingleBlogBYModerator,
    countVote,
    getAllBlogsForAdmin
};
