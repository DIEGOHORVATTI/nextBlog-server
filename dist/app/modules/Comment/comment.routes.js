"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/:blogId', comment_controller_1.CommentControllers.getAllComments);
router.delete('/:id', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUBSCRIBER, client_1.UserRole.MODERATOR, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BLOGGER), comment_controller_1.CommentControllers.deleteComment);
router.patch('/update-comment/:id', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUBSCRIBER, client_1.UserRole.MODERATOR, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BLOGGER), comment_controller_1.CommentControllers.updateMyComment);
router.post('/create-comment', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUBSCRIBER, client_1.UserRole.MODERATOR, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BLOGGER), comment_controller_1.CommentControllers.createComment);
router.get('/get-single-comment/:id', (0, authGuard_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.SUBSCRIBER, client_1.UserRole.MODERATOR, client_1.UserRole.SUPER_ADMIN, client_1.UserRole.BLOGGER), comment_controller_1.CommentControllers.getSingleComment);
exports.CommentRoutes = router;
