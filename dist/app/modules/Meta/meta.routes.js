"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetaRoutes", {
    enumerable: true,
    get: function() {
        return MetaRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _metacontroller = require("./meta.controller");
const _authGuard = /*#__PURE__*/ _interop_require_default(require("../../middlewares/authGuard"));
const _client = require("@prisma/client");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
// Routes for fetching metadata for the dashboard
router.get('/', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.BLOGGER, _client.UserRole.MODERATOR, _client.UserRole.SUPER_ADMIN), _metacontroller.MetaController.fetchDashboardMetadata);
const MetaRoutes = router;
