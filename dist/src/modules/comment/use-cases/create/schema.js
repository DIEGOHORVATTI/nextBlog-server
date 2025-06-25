"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCommentSchema", {
    enumerable: true,
    get: function() {
        return createCommentSchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const createCommentSchema = (0, _createschemabuilder.createSchemaBuilder)({
    content: ()=>_createschemabuilder.z.string().min(1, 'Content is required').max(1000, 'Content too long'),
    postId: ()=>_createschemabuilder.z.string().uuid('Invalid post ID'),
    parentId: ()=>_createschemabuilder.z.string().uuid('Invalid parent comment ID').nullable()
});
