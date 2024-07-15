"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServicres = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const blog_constant_1 = require("./blog.constant");
const HTTPError_1 = require("../../errors/HTTPError");
const http_status_1 = __importDefault(require("http-status"));
const craeteBlogIntoDb = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ user });
    const authorData = yield prismaClient_1.default.author.findUniqueOrThrow({
        where: {
            email: user.email,
        },
    });
    const result = yield prismaClient_1.default.blog.create({
        data: Object.assign(Object.assign({}, payload), { authorId: authorData.id }),
    });
    return result;
});
// const getAllBlogFomDB = async (
//   queryParams: IBlogFilterParams,
//   paginationAndSortingQueryParams: IPaginationParams & ISortingParams
// ) => {
//   const { q, ...otherQueryParams } = queryParams;
//   const { limit, skip, page, sortBy, sortOrder } =
//     generatePaginateAndSortOptions({
//       ...paginationAndSortingQueryParams,
//     });
//   //  const conditions: Prisma.BlogWhereInput[] = [];
//   const conditions: Prisma.BlogWhereInput[] = [];
//   // filtering out the soft deleted users
//   conditions.push({
//     visibility: Visibility.PUBLIC,
//   });
//   //@ searching
//   if (q) {
//     const searchConditions = blogSearchableFields.map((field) => ({
//       [field]: { contains: q, mode: "insensitive" },
//     }));
//     conditions.push({ OR: searchConditions });
//   }
//   //@ filtering with exact value
//   if (Object.keys(otherQueryParams).length > 0) {
//     const filterData = Object.keys(otherQueryParams).map((key) => ({
//       [key]: (otherQueryParams as any)[key],
//     }));
//     conditions.push(...filterData);
//   }
//   const result = await prisma.blog.findMany({
//     where: { AND: conditions },
//     skip,
//     take: limit,
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//     include: {
//       author: true,
//     },
//   });
//   const total = await prisma.blog.count({
//     where: { AND: conditions },
//   });
//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     result,
//   };
// };
const getAllBlogFomDB = (queryParams, paginationAndSortingQueryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, tag } = queryParams, otherQueryParams = __rest(queryParams, ["q", "tag"]); // Destructure tag from queryParams
    const { limit, skip, page, sortBy, sortOrder } = (0, paginationHelpers_1.generatePaginateAndSortOptions)(Object.assign({}, paginationAndSortingQueryParams));
    const conditions = [];
    // filtering out the soft deleted users
    conditions.push({
        visibility: client_1.Visibility.PUBLIC,
    });
    // Searching
    if (q) {
        const searchConditions = blog_constant_1.blogSearchableFields.map((field) => ({
            [field]: { contains: q, mode: 'insensitive' },
        }));
        conditions.push({ OR: searchConditions });
    }
    // Filtering with exact value
    if (Object.keys(otherQueryParams).length > 0) {
        const filterData = Object.keys(otherQueryParams).map((key) => ({
            [key]: otherQueryParams[key],
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
                        mode: 'insensitive',
                    },
                },
            },
        });
    }
    const result = yield prismaClient_1.default.blog.findMany({
        where: { AND: conditions },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            author: true,
            tag: true, // Include tags in the result
        },
    });
    const total = yield prismaClient_1.default.blog.count({
        where: { AND: conditions },
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
const getSingleBlogFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ user });
    const blogPost = yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        let includeOptions = {};
        const post = yield tx.blog.findUnique({
            where: {
                id,
            },
            include: {
                author: true,
                comment: true,
                tag: true,
            },
        });
        // Increment views within the transaction
        yield tx.blog.update({
            where: {
                id,
            },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
        return post;
    }));
    return blogPost;
});
const getMyAllBlogsFomDB = (queryParams, paginationAndSortingQueryParams, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            id: user.userId,
        },
    });
    const authorData = yield prismaClient_1.default.author.findUniqueOrThrow({
        where: {
            email: userData.email,
        },
    });
    const { q } = queryParams, otherQueryParams = __rest(queryParams, ["q"]);
    const { limit, skip, page, sortBy, sortOrder } = (0, paginationHelpers_1.generatePaginateAndSortOptions)(Object.assign({}, paginationAndSortingQueryParams));
    //  const conditions: Prisma.BlogWhereInput[] = [];
    const conditions = [];
    // filtering out the soft deleted users
    conditions.push({
        visibility: client_1.Visibility.PUBLIC,
    });
    //@ searching
    if (q) {
        const searchConditions = blog_constant_1.blogSearchableFields.map((field) => ({
            [field]: { contains: q, mode: 'insensitive' },
        }));
        conditions.push({ OR: searchConditions });
    }
    //@ filtering with exact value
    if (Object.keys(otherQueryParams).length > 0) {
        const filterData = Object.keys(otherQueryParams).map((key) => ({
            [key]: otherQueryParams[key],
        }));
        conditions.push(...filterData);
    }
    const result = yield prismaClient_1.default.blog.findMany({
        where: {
            AND: [...conditions, { authorId: authorData.id }],
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prismaClient_1.default.blog.count({
        where: {
            AND: [...conditions, { authorId: authorData.id }],
        },
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Use a Prisma transaction to ensure atomicity
    const result = yield prismaClient_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        // Delete all comments associated with the blog
        yield tx.comment.deleteMany({
            where: {
                blogId: id,
            },
        });
        yield tx.like.deleteMany({
            where: {
                blogId: id,
            },
        });
        // Delete the blog
        const deleteBlog = yield tx.blog.delete({
            where: {
                id,
            },
        });
        // Return the deleted blog
        return deleteBlog;
    }));
    return result;
});
const updateBlogIntoDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.blog.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield prismaClient_1.default.blog.update({
        where: {
            id,
        },
        data,
    });
    return result;
});
const changeApprovalStatusDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.blog.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const isCancel = yield prismaClient_1.default.blog.findUnique({
        where: {
            id,
            publishedStatus: client_1.Published_status.CANCEL,
        },
    });
    if (isCancel) {
        throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, 'Can not updated its status is cancel');
    }
    console.log(isCancel);
    const result = yield prismaClient_1.default.blog.update({
        where: {
            id,
            NOT: {
                publishedStatus: {
                    in: [client_1.Published_status.CANCEL],
                },
            },
        },
        data,
    });
    return result;
});
const countVote = (id, action) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, action);
    // Find the blog post by its unique ID
    const blog = yield prismaClient_1.default.blog.findUnique({
        where: {
            id: id,
        },
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
        }
        else if (action === 'downvote') {
            blog.votes -= 1;
        }
        else {
            throw new Error('Invalid action');
        }
    }
    else {
        throw new Error('Votes cannot be null');
    }
    // Save the updated blog post with the new vote count
    const updatedBlog = yield prismaClient_1.default.blog.update({
        where: {
            id: id,
        },
        data: {
            votes: blog.votes, // blog.votes is guaranteed to be a number here
        },
    });
    return updatedBlog.votes;
});
const getSingleBlogBYModerator = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blogData = yield prismaClient_1.default.blog.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            author: true,
        },
    });
    return blogData;
});
exports.blogServicres = {
    getAllBlogFomDB,
    craeteBlogIntoDb,
    getSingleBlogFromDB,
    getMyAllBlogsFomDB,
    deleteBlogFromDB,
    updateBlogIntoDB,
    changeApprovalStatusDB,
    getSingleBlogBYModerator,
    countVote,
};
