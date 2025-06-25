"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "paginationSchema", {
    enumerable: true,
    get: function() {
        return paginationSchema;
    }
});
const _createschemabuilder = require("../../lib/create-schema-builder");
const paginationSchema = (0, _createschemabuilder.createSchemaBuilder)({
    page: ()=>_createschemabuilder.z.number().int().min(1).default(1).optional(),
    limit: ()=>_createschemabuilder.z.number().int().min(1).max(50).default(20).optional()
});
