"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteCommentSchema", {
    enumerable: true,
    get: function() {
        return deleteCommentSchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const deleteCommentSchema = (0, _createschemabuilder.createSchemaBuilder)({
    id: ()=>_createschemabuilder.z.string().uuid('Invalid comment ID format')
});
