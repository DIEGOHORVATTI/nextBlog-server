"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPostsSchema", {
    enumerable: true,
    get: function() {
        return getPostsSchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const getPostsSchema = (0, _createschemabuilder.createSchemaBuilder)({
    page: ()=>_createschemabuilder.z.number().int().min(1).default(1).optional(),
    limit: ()=>_createschemabuilder.z.number().int().min(1).max(100).default(10).optional(),
    search: ()=>_createschemabuilder.z.string().min(1).optional(),
    categoryId: ()=>_createschemabuilder.z.string().uuid().nullable(),
    published: ()=>_createschemabuilder.z.boolean().optional(),
    authorId: ()=>_createschemabuilder.z.string().uuid()
});
