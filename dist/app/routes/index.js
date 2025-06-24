"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _authroutes = require("../modules/auth/auth.routes");
const _userroutes = require("../modules/User/user.routes");
const _adminroutes = require("../modules/Admin/admin.routes");
const _blogroutes = require("../modules/Blog/blog.routes");
const _authorroutes = require("../modules/Author/author.routes");
const _moderatorroutes = require("../modules/Moderator/moderator.routes");
const _commentroutes = require("../modules/Comment/comment.routes");
const _likeroutes = require("../modules/Like/like.routes");
const _metaroutes = require("../modules/Meta/meta.routes");
const _tagroute = require("../modules/Tag/tag.route");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
const moduleRoutes = [
    {
        path: '/user',
        route: _userroutes.userRoutes
    },
    {
        path: '/admin',
        route: _adminroutes.AdminRoutes
    },
    {
        path: '/author',
        route: _authorroutes.AuthorRoutes
    },
    {
        path: '/moderator',
        route: _moderatorroutes.ModeratorRoutes
    },
    {
        path: '/auth',
        route: _authroutes.authRoutes
    },
    {
        path: '/blog',
        route: _blogroutes.blogRoutes
    },
    {
        path: '/comment',
        route: _commentroutes.CommentRoutes
    },
    {
        path: '/like',
        route: _likeroutes.LikeRoutes
    },
    {
        path: '/metadata',
        route: _metaroutes.MetaRoutes
    },
    {
        path: '/tag',
        route: _tagroute.TagRoutes
    }
];
moduleRoutes.forEach((route)=>router.use(route.path, route.route));
const _default = router;
