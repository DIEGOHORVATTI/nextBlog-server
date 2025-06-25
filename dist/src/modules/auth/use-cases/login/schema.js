"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loginSchema", {
    enumerable: true,
    get: function() {
        return loginSchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const loginSchema = (0, _createschemabuilder.createSchemaBuilder)({
    email: ()=>_createschemabuilder.z.string().email(),
    password: ()=>_createschemabuilder.z.string().min(6).max(100)
});
