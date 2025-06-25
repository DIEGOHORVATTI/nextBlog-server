"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateUserSchema", {
    enumerable: true,
    get: function() {
        return updateUserSchema;
    }
});
const _client = require("@prisma/client");
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const updateUserSchema = (0, _createschemabuilder.createSchemaBuilder)({
    email: ()=>_createschemabuilder.z.string().email().optional(),
    name: ()=>_createschemabuilder.z.string().min(1).max(100).optional(),
    password: ()=>_createschemabuilder.z.string().min(6).max(100).optional(),
    role: ()=>_createschemabuilder.z.nativeEnum(_client.UserRole).optional()
});
