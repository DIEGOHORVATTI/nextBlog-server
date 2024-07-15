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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
const client_1 = require("@prisma/client");
const HTTPError_1 = require("../../errors/HTTPError");
const fetchDashboardMetadata = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let metadata;
    switch (user.role) {
        case client_1.UserRole.ADMIN:
            metadata = yield getAdminDashboardMetadata();
            break;
        case client_1.UserRole.SUPER_ADMIN:
            metadata = yield getSuperAdminDashboardMetadata();
            break;
        case client_1.UserRole.MODERATOR:
            metadata = yield getModeratorDashboardMetadata(user);
            break;
        case client_1.UserRole.BLOGGER:
            metadata = yield getBloggerDashboardMetadata(user);
            break;
        default:
            throw new Error('Invalid user role');
    }
    return metadata;
});
const getAdminDashboardMetadata = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogCount = yield prismaClient_1.default.blog.count();
    const bloggerCount = yield prismaClient_1.default.author.count();
    const adminCount = yield prismaClient_1.default.admin.count();
    const commentCount = yield prismaClient_1.default.comment.count();
    const likeCount = yield prismaClient_1.default.like.count();
    const moderatorCount = yield prismaClient_1.default.moderator.count();
    const pendingBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.PENDING,
        },
    });
    const approvedBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.APPROVED,
        },
    });
    const cancelBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.CANCEL,
        },
    });
    const barChartData = yield getBarChartData();
    const pieChartData = yield getPieChartData();
    return {
        blogCount,
        bloggerCount,
        adminCount,
        commentCount,
        likeCount,
        pendingBlogCount,
        approvedBlogCount,
        cancelBlogCount,
        pieChartData,
        barChartData,
    };
});
const getSuperAdminDashboardMetadata = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogCount = yield prismaClient_1.default.blog.count();
    const bloggerCount = yield prismaClient_1.default.author.count();
    const adminCount = yield prismaClient_1.default.admin.count();
    const userCount = yield prismaClient_1.default.user.count();
    const commentCount = yield prismaClient_1.default.comment.count();
    const likeCount = yield prismaClient_1.default.like.count();
    const moderatorCount = yield prismaClient_1.default.moderator.count();
    const pendingBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.PENDING,
        },
    });
    const approvedBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.APPROVED,
        },
    });
    const cancelBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.CANCEL,
        },
    });
    const barChartData = yield getBarChartData();
    const pieChartData = yield getPieChartData();
    return {
        blogCount,
        bloggerCount,
        adminCount,
        commentCount,
        likeCount,
        pendingBlogCount,
        approvedBlogCount,
        cancelBlogCount,
        pieChartData,
        barChartData,
        userCount,
        moderatorCount,
    };
});
const getModeratorDashboardMetadata = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    const bloggerCount = yield prismaClient_1.default.author.count();
    const blogCount = yield prismaClient_1.default.blog.count();
    const moderatorCount = yield prismaClient_1.default.moderator.count();
    const pendingBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.PENDING,
        },
    });
    const approvedBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.APPROVED,
        },
    });
    const cancelBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.CANCEL,
        },
    });
    const commentCount = yield prismaClient_1.default.comment.count();
    const likeCount = yield prismaClient_1.default.like.count();
    const barChartData = yield getBarChartData();
    const pieChartData = yield getPieChartData();
    return {
        blogCount,
        bloggerCount,
        commentCount,
        likeCount,
        moderatorCount,
        pendingBlogCount,
        approvedBlogCount,
        cancelBlogCount,
        barChartData,
    };
});
const getBloggerDashboardMetadata = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogger = yield prismaClient_1.default.author.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    if (!blogger) {
        throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, 'Patient not found!');
    }
    const blogCount = yield prismaClient_1.default.blog.count({
        where: {
            authorId: blogger.id,
        },
    });
    const pendingBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.PENDING,
            authorId: blogger.id,
        },
    });
    const approvedBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.APPROVED,
            authorId: blogger.id,
        },
    });
    const cancelBlogCount = yield prismaClient_1.default.blog.count({
        where: {
            publishedStatus: client_1.Published_status.CANCEL,
            authorId: blogger.id,
        },
    });
    const commentCount = yield prismaClient_1.default.comment.count({
        where: {
            authorId: blogger.id,
        },
    });
    const viewCount = yield prismaClient_1.default.blog.aggregate({
        where: {
            authorId: blogger.id,
        },
        _sum: {
            views: true,
        },
    });
    const totalViews = ((_a = viewCount._sum) === null || _a === void 0 ? void 0 : _a.views) || 0;
    const barChartData = yield getBarChartData();
    const pieChartData = yield getPieChartData();
    return {
        blogCount,
        cancelBlogCount,
        approvedBlogCount,
        pendingBlogCount,
        commentCount,
        totalViews,
        barChartData,
        pieChartData,
    };
});
const getBarChartData = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentCountByDay = yield prismaClient_1.default.$queryRaw `
        SELECT DATE_TRUNC('day', "createdAt") AS day,
               COUNT(*) AS count
        FROM "blogs"
        GROUP BY day
        ORDER BY day ASC
    `;
    const formattedMetadata = appointmentCountByDay.map(({ day, count }) => ({
        day,
        count: Number(count), // Convert BigInt to integer
    }));
    return formattedMetadata;
});
const getPieChartData = () => __awaiter(void 0, void 0, void 0, function* () {
    const appointmentStatusDistribution = yield prismaClient_1.default.blog.groupBy({
        by: ['id'],
        _count: { id: true },
    });
    const formattedData = appointmentStatusDistribution.map(({ id, _count }) => ({
        id,
        count: Number(_count.id), // Convert BigInt to integer
    }));
    return formattedData;
});
exports.metaServices = {
    fetchDashboardMetadata,
};
