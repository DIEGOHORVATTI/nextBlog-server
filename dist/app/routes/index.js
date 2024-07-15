"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/User/user.routes");
const admin_routes_1 = require("../modules/Admin/admin.routes");
const blog_routes_1 = require("../modules/Blog/blog.routes");
const author_routes_1 = require("../modules/Author/author.routes");
const moderator_routes_1 = require("../modules/Moderator/moderator.routes");
const comment_routes_1 = require("../modules/Comment/comment.routes");
const like_routes_1 = require("../modules/Like/like.routes");
const meta_routes_1 = require("../modules/Meta/meta.routes");
const tag_route_1 = require("../modules/Tag/tag.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/admin',
        route: admin_routes_1.AdminRoutes,
    },
    {
        path: '/author',
        route: author_routes_1.AuthorRoutes,
    },
    {
        path: '/moderator',
        route: moderator_routes_1.ModeratorRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
    {
        path: '/blog',
        route: blog_routes_1.blogRoutes,
    },
    {
        path: '/comment',
        route: comment_routes_1.CommentRoutes,
    },
    {
        path: '/like',
        route: like_routes_1.LikeRoutes,
    },
    {
        path: '/metadata',
        route: meta_routes_1.MetaRoutes,
    },
    {
        path: '/tag',
        route: tag_route_1.TagRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
