"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userRoutes", {
    enumerable: true,
    get: function() {
        return userRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _authGuard = /*#__PURE__*/ _interop_require_default(require("../../middlewares/authGuard"));
const _client = require("@prisma/client");
const _usercontroller = require("./user.controller");
const _validateRequest = require("../../middlewares/validateRequest");
const _uservalidationSchema = require("./user.validationSchema");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.get('/', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUPER_ADMIN), _usercontroller.userController.getAllUsers);
router.get('/me', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.BLOGGER, _client.UserRole.MODERATOR, _client.UserRole.SUPER_ADMIN), _usercontroller.userController.getMyProfile);
router.patch('/update-my-profile', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.BLOGGER, _client.UserRole.MODERATOR, _client.UserRole.SUPER_ADMIN), _usercontroller.userController.updateMyProfile);
router.patch('/:id/status', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUPER_ADMIN), (0, _validateRequest.validateRequest)(_uservalidationSchema.userValidationSchema.userUpdateStatus), _usercontroller.userController.changeProfileStatus);
router.post('/create-admin', (0, _authGuard.default)(_client.UserRole.ADMIN, _client.UserRole.SUPER_ADMIN), (0, _validateRequest.validateRequest)(_uservalidationSchema.userValidationSchema.createAdminSchema), _usercontroller.userController.createAdmin);
router.post('/create-author', //  authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN),validateRequest(userValidationSchema.createAuthorSchema),
_usercontroller.userController.createAuthor);
router.post('/create-moderator', // authGuard(UserRole.ADMIN,UserRole.SUPER_ADMIN),
(0, _validateRequest.validateRequest)(_uservalidationSchema.userValidationSchema.createModaratorSchema), _usercontroller.userController.createModarator);
router.post('/create-subscriber', _usercontroller.userController.createSubscriber);
const userRoutes = router;
