"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthorRoutes", {
    enumerable: true,
    get: function() {
        return AuthorRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _validateRequest = require("../../middlewares/validateRequest");
const _authorcontroller = require("./author.controller");
const _authorvalidation = require("./author.validation");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.get('/', // authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
_authorcontroller.AuthorController.getAllAuthor);
router.get('/:id', _authorcontroller.AuthorController.getSingleAuthor);
router.patch('/:id', (0, _validateRequest.validateRequest)(_authorvalidation.authorValidationSchemas.updateAuthorSchema), _authorcontroller.AuthorController.updateAuthor);
router.delete('/:id', _authorcontroller.AuthorController.deleteAuthor);
router.delete('/soft/:id', _authorcontroller.AuthorController.softDeleteAuthor);
const AuthorRoutes = router;
