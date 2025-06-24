"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagRoutes", {
    enumerable: true,
    get: function() {
        return TagRoutes;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _tagcontroller = require("./tag.controller");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = _express.default.Router();
router.post('/create-tag', _tagcontroller.TagControllers.addTag);
router.get('/', _tagcontroller.TagControllers.getAllTags);
const TagRoutes = router;
