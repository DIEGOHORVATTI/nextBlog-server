"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRoutes = void 0;
const express_1 = __importDefault(require("express"));
const tag_controller_1 = require("./tag.controller");
const router = express_1.default.Router();
router.post('/create-tag', tag_controller_1.TagControllers.addTag);
router.get('/', tag_controller_1.TagControllers.getAllTags);
exports.TagRoutes = router;
