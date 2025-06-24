"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "blogRoutes", {
    enumerable: true,
    get: function() {
        return blogRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _authGuard = /*#__PURE__*/ _interop_require_default(require("../../middlewares/authGuard"));
const _client = require("@prisma/client");
const _blogvalidation = require("./blog.validation");
const _blogcontroller = require("./blog.controller");
const _validateRequest = require("../../middlewares/validateRequest");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.get('/get-for-admin', _blogcontroller.blogController.getAllBlogsForAdmin);
router.get('/', _blogcontroller.blogController.getAllBlogs);
router.get('/my-blogs', (0, _authGuard.default)(_client.UserRole.BLOGGER), _blogcontroller.blogController.getMyAllBlogs);
router.get('/:id', _blogcontroller.blogController.getSingleBlog);
router.get('/get-single-blog/:id', _blogcontroller.blogController.getSingleBlogBYModerator);
router.post('/create-blog', (0, _authGuard.default)(_client.UserRole.BLOGGER), // validateRequest(blogValidationSchema.createBlog),
_blogcontroller.blogController.createBlog);
router.delete('/:id', (0, _authGuard.default)(_client.UserRole.SUPER_ADMIN, _client.UserRole.ADMIN, _client.UserRole.BLOGGER, _client.UserRole.MODERATOR), _blogcontroller.blogController.deleteBlog);
router.patch('/update-blog/:id', (0, _authGuard.default)(_client.UserRole.MODERATOR, _client.UserRole.BLOGGER, _client.UserRole.ADMIN, _client.UserRole.SUPER_ADMIN), (0, _validateRequest.validateRequest)(_blogvalidation.blogValidationSchema.updateBlog), _blogcontroller.blogController.updateBlog);
router.patch('/change-approval-status/:id', // authGuard(UserRole.MODERATOR,UserRole.ADMIN,UserRole.SUPER_ADMIN),
(0, _validateRequest.validateRequest)(_blogvalidation.blogValidationSchema.updateChangeApprovalStatusBlog), _blogcontroller.blogController.changeApprovalStatusBlog);
router.patch('/vote-blog/:id', _blogcontroller.blogController.voteCount);
const blogRoutes = router;
