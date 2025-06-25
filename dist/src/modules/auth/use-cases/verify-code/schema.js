"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "verifyCodeSchema", {
    enumerable: true,
    get: function() {
        return verifyCodeSchema;
    }
});
const _createschemabuilder = require("../../../../lib/create-schema-builder");
const verifyCodeSchema = (0, _createschemabuilder.createSchemaBuilder)({
    email: ()=>_createschemabuilder.z.string().email(),
    code: ()=>_createschemabuilder.z.string()
});
