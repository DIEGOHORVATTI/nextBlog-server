"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createPostSchema", {
    enumerable: true,
    get: function() {
        return createPostSchema;
    }
});
const _client = require("@prisma/client");
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const createPostSchema = (0, _createschemabuilder.createSchemaBuilder)({
    title: ()=>_createschemabuilder.z.string().min(1, 'Title is required').max(200, 'Title too long'),
    content: ()=>_createschemabuilder.z.string().min(1, 'Content is required'),
    excerpt: ()=>_createschemabuilder.z.string().max(500, 'Excerpt too long'),
    coverUrl: ()=>_createschemabuilder.z.string().url('Invalid URL format'),
    tags: ()=>_createschemabuilder.z.array(_createschemabuilder.z.string()).optional(),
    categoryId: ()=>_createschemabuilder.z.string().uuid('Invalid category ID'),
    publishedAt: ()=>_createschemabuilder.z.date().nullable(),
    status: ()=>_createschemabuilder.z.nativeEnum(_client.PostStatus),
    visibility: ()=>_createschemabuilder.z.nativeEnum(_client.Visibility)
});
