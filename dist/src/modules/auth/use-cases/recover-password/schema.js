"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recoverPasswordSchema", {
    enumerable: true,
    get: function() {
        return recoverPasswordSchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const recoverPasswordSchema = (0, _createschemabuilder.createSchemaBuilder)({
    email: ()=>_createschemabuilder.z.string().email()
});
