"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updatePostSchema", {
    enumerable: true,
    get: function() {
        return updatePostSchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const updatePostSchema = (0, _createschemabuilder.createSchemaBuilder)({
    title: ()=>_createschemabuilder.z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
    content: ()=>_createschemabuilder.z.string().min(1, 'Content is required').optional(),
    excerpt: ()=>_createschemabuilder.z.string().max(500, 'Excerpt too long').optional(),
    coverUrl: ()=>_createschemabuilder.z.string().url('Invalid URL format').optional(),
    tags: ()=>_createschemabuilder.z.array(_createschemabuilder.z.string()).optional(),
    categoryId: ()=>_createschemabuilder.z.string().uuid('Invalid category ID').optional(),
    published: ()=>_createschemabuilder.z.boolean().optional()
});
