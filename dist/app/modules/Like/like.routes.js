"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const like_controller_1 = require("./like.controller");
const router = express_1.default.Router();
// router.post("/:id/unlike", authGuard(UserRole.ADMIN,UserRole.MODERATOR,UserRole.SUBSCRIBER,UserRole.SUPER_ADMIN), LikeControllers.unlike);
router.post('/:blogId', 
//  authGuard(UserRole.ADMIN,UserRole.MODERATOR,UserRole.SUBSCRIBER,UserRole.SUPER_ADMIN),
like_controller_1.LikeControllers.like);
exports.LikeRoutes = router;
