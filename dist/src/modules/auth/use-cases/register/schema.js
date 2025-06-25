"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerUserSchema", {
    enumerable: true,
    get: function() {
        return registerUserSchema;
    }
});
const _client = require("@prisma/client");
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const registerUserSchema = (0, _createschemabuilder.createSchemaBuilder)({
    email: ()=>_createschemabuilder.z.string().email(),
    name: ()=>_createschemabuilder.z.string().min(1).max(100),
    password: ()=>_createschemabuilder.z.string().min(6).max(100),
    role: ()=>_createschemabuilder.z.nativeEnum(_client.UserRole)
});
