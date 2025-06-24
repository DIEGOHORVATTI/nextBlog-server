"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModeratorRoutes", {
    enumerable: true,
    get: function() {
        return ModeratorRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _validateRequest = require("../../middlewares/validateRequest");
const _authGuard = /*#__PURE__*/ _interop_require_default(require("../../middlewares/authGuard"));
const _client = require("@prisma/client");
const _moderatorcontroller = require("./moderator.controller");
const _moderatorvalidation = require("./moderator.validation");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.get('/', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUPER_ADMIN), _moderatorcontroller.ModeratorController.getAllModerator);
router.get('/:id', _moderatorcontroller.ModeratorController.getSingleModerator);
router.patch('/:id', (0, _validateRequest.validateRequest)(_moderatorvalidation.moderatorValidationSchemas.updateModeratorSchema), _moderatorcontroller.ModeratorController.updateModerator);
router.delete('/:id', _moderatorcontroller.ModeratorController.deleteModerator);
router.delete('/soft/:id', _moderatorcontroller.ModeratorController.softDeleteModerator);
const ModeratorRoutes = router;
