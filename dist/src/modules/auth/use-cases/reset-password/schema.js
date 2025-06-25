"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resetPasswordSchema", {
    enumerable: true,
    get: function() {
        return resetPasswordSchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const resetPasswordSchema = (0, _createschemabuilder.createSchemaBuilder)({
    email: ()=>_createschemabuilder.z.string().email(),
    newPassword: ()=>_createschemabuilder.z.string().min(8),
    code: ()=>_createschemabuilder.z.string()
});
