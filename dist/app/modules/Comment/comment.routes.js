"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentRoutes", {
    enumerable: true,
    get: function() {
        return CommentRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _commentcontroller = require("./comment.controller");
const _authGuard = /*#__PURE__*/ _interop_require_default(require("../../middlewares/authGuard"));
const _client = require("@prisma/client");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.get('/:blogId', _commentcontroller.CommentControllers.getAllComments);
router.delete('/:id', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUBSCRIBER, _client.UserRole.MODERATOR, _client.UserRole.SUPER_ADMIN, _client.UserRole.BLOGGER), _commentcontroller.CommentControllers.deleteComment);
router.patch('/update-comment/:id', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUBSCRIBER, _client.UserRole.MODERATOR, _client.UserRole.SUPER_ADMIN, _client.UserRole.BLOGGER), _commentcontroller.CommentControllers.updateMyComment);
router.post('/create-comment', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUBSCRIBER, _client.UserRole.MODERATOR, _client.UserRole.SUPER_ADMIN, _client.UserRole.BLOGGER), _commentcontroller.CommentControllers.createComment);
router.get('/get-single-comment/:id', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUBSCRIBER, _client.UserRole.MODERATOR, _client.UserRole.SUPER_ADMIN, _client.UserRole.BLOGGER), _commentcontroller.CommentControllers.getSingleComment);
const CommentRoutes = router;
