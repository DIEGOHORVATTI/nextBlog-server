"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminRoutes", {
    enumerable: true,
    get: function() {
        return AdminRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _admincontroller = require("./admin.controller");
const _validateRequest = require("../../middlewares/validateRequest");
const _adminValidationSchema = require("./admin.ValidationSchema");
const _authGuard = /*#__PURE__*/ _interop_require_default(require("../../middlewares/authGuard"));
const _client = require("@prisma/client");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.get('/', // authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
_admincontroller.AdminController.getAllAdmin);
router.get('/:id', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUPER_ADMIN), _admincontroller.AdminController.getSingleAdmin);
router.patch('/:id', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUPER_ADMIN), (0, _validateRequest.validateRequest)(_adminValidationSchema.adminValidationSchemas.update), _admincontroller.AdminController.updateAdmin);
router.delete('/:id', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUPER_ADMIN), _admincontroller.AdminController.deleteAdmin);
router.delete('/soft/:id', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUPER_ADMIN), _admincontroller.AdminController.softDeleteAdmin);
const AdminRoutes = router;
