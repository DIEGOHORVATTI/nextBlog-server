"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LikeRoutes", {
    enumerable: true,
    get: function() {
        return LikeRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _likecontroller = require("./like.controller");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// router.post("/:id/unlike", authGuard(UserRole.ADMIN,UserRole.MODERATOR,UserRole.SUBSCRIBER,UserRole.SUPER_ADMIN), LikeControllers.unlike);
router.post('/:blogId', //  authGuard(UserRole.ADMIN,UserRole.MODERATOR,UserRole.SUBSCRIBER,UserRole.SUPER_ADMIN),
_likecontroller.LikeControllers.like);
const LikeRoutes = router;
