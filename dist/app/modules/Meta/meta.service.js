"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "metaServices", {
    enumerable: true,
    get: function() {
        return metaServices;
    }
});
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
const _client = require("@prisma/client");
const _HTTPError = require("../../errors/HTTPError");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const fetchDashboardMetadata = async (user)=>{
    let metadata;
    switch(user.role){
        case _client.UserRole.ADMIN:
            metadata = await getAdminDashboardMetadata();
            break;
        case _client.UserRole.SUPER_ADMIN:
            metadata = await getSuperAdminDashboardMetadata();
            break;
        case _client.UserRole.MODERATOR:
            metadata = await getModeratorDashboardMetadata(user);
            break;
        case _client.UserRole.BLOGGER:
            metadata = await getBloggerDashboardMetadata(user);
            break;
        default:
            throw new Error('Invalid user role');
    }
    return metadata;
};
const getAdminDashboardMetadata = async ()=>{
    const blogCount = await _prismaClient.default.blog.count();
    const bloggerCount = await _prismaClient.default.author.count();
    const adminCount = await _prismaClient.default.admin.count();
    const commentCount = await _prismaClient.default.comment.count();
    const likeCount = await _prismaClient.default.like.count();
    const moderatorCount = await _prismaClient.default.moderator.count();
    const pendingBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.PENDING
        }
    });
    const approvedBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.APPROVED
        }
    });
    const cancelBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.CANCEL
        }
    });
    const barChartData = await getBarChartData();
    const pieChartData = await getPieChartData();
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
        barChartData
    };
};
const getSuperAdminDashboardMetadata = async ()=>{
    const blogCount = await _prismaClient.default.blog.count();
    const bloggerCount = await _prismaClient.default.author.count();
    const adminCount = await _prismaClient.default.admin.count();
    const userCount = await _prismaClient.default.user.count();
    const commentCount = await _prismaClient.default.comment.count();
    const likeCount = await _prismaClient.default.like.count();
    const moderatorCount = await _prismaClient.default.moderator.count();
    const pendingBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.PENDING
        }
    });
    const approvedBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.APPROVED
        }
    });
    const cancelBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.CANCEL
        }
    });
    const barChartData = await getBarChartData();
    const pieChartData = await getPieChartData();
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
        moderatorCount
    };
};
const getModeratorDashboardMetadata = async (user)=>{
    await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            email: user?.email
        }
    });
    const bloggerCount = await _prismaClient.default.author.count();
    const blogCount = await _prismaClient.default.blog.count();
    const moderatorCount = await _prismaClient.default.moderator.count();
    const pendingBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.PENDING
        }
    });
    const approvedBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.APPROVED
        }
    });
    const cancelBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.CANCEL
        }
    });
    const commentCount = await _prismaClient.default.comment.count();
    const likeCount = await _prismaClient.default.like.count();
    const barChartData = await getBarChartData();
    const pieChartData = await getPieChartData();
    return {
        blogCount,
        bloggerCount,
        commentCount,
        likeCount,
        moderatorCount,
        pendingBlogCount,
        approvedBlogCount,
        cancelBlogCount,
        barChartData
    };
};
const getBloggerDashboardMetadata = async (user)=>{
    const blogger = await _prismaClient.default.author.findUnique({
        where: {
            email: user?.email
        }
    });
    if (!blogger) {
        throw new _HTTPError.HTTPError(_httpstatus.default.BAD_REQUEST, 'Patient not found!');
    }
    const blogCount = await _prismaClient.default.blog.count({
        where: {
            authorId: blogger.id
        }
    });
    const pendingBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.PENDING,
            authorId: blogger.id
        }
    });
    const approvedBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.APPROVED,
            authorId: blogger.id
        }
    });
    const cancelBlogCount = await _prismaClient.default.blog.count({
        where: {
            publishedStatus: _client.Published_status.CANCEL,
            authorId: blogger.id
        }
    });
    const commentCount = await _prismaClient.default.comment.count({
        where: {
            authorId: blogger.id
        }
    });
    const viewCount = await _prismaClient.default.blog.aggregate({
        where: {
            authorId: blogger.id
        },
        _sum: {
            views: true
        }
    });
    const totalViews = viewCount._sum?.views || 0;
    const barChartData = await getBarChartData();
    const pieChartData = await getPieChartData();
    return {
        blogCount,
        cancelBlogCount,
        approvedBlogCount,
        pendingBlogCount,
        commentCount,
        totalViews,
        barChartData,
        pieChartData
    };
};
const getBarChartData = async ()=>{
    const appointmentCountByDay = await _prismaClient.default.$queryRaw`
        SELECT DATE_TRUNC('day', "createdAt") AS day,
               COUNT(*) AS count
        FROM "blogs"
        GROUP BY day
        ORDER BY day ASC
    `;
    const formattedMetadata = appointmentCountByDay.map(({ day, count })=>({
            day,
            count: Number(count)
        }));
    return formattedMetadata;
};
const getPieChartData = async ()=>{
    const appointmentStatusDistribution = await _prismaClient.default.blog.groupBy({
        by: [
            'id'
        ],
        _count: {
            id: true
        }
    });
    const formattedData = appointmentStatusDistribution.map(({ id, _count })=>({
            id,
            count: Number(_count.id)
        }));
    return formattedData;
};
const metaServices = {
    fetchDashboardMetadata
};
