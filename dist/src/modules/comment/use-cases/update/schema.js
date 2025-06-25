"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateCommentSchema", {
    enumerable: true,
    get: function() {
        return updateCommentSchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const updateCommentSchema = (0, _createschemabuilder.createSchemaBuilder)({
    content: ()=>_createschemabuilder.z.string().min(1, 'Content is required').max(1000, 'Content too long')
});
