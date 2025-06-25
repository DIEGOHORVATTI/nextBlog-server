"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateCategorySchema", {
    enumerable: true,
    get: function() {
        return updateCategorySchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const updateCategorySchema = (0, _createschemabuilder.createSchemaBuilder)({
    name: ()=>_createschemabuilder.z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
    description: ()=>_createschemabuilder.z.string().max(500, 'Description too long').optional(),
    color: ()=>_createschemabuilder.z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').optional()
});
