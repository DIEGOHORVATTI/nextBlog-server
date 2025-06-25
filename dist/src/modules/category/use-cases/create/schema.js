"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCategorySchema", {
    enumerable: true,
    get: function() {
        return createCategorySchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const createCategorySchema = (0, _createschemabuilder.createSchemaBuilder)({
    name: ()=>_createschemabuilder.z.string().min(1, 'Name is required').max(100, 'Name too long'),
    description: ()=>_createschemabuilder.z.string().max(500, 'Description too long').nullable(),
    color: ()=>_createschemabuilder.z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').nullable()
});
