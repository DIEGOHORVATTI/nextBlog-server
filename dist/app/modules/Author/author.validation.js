"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authorValidationSchemas", {
    enumerable: true,
    get: function() {
        return authorValidationSchemas;
    }
});
const _zod = require("zod");
const updateAuthorSchema = _zod.z.object({
    body: _zod.z.object({
        name: _zod.z.string().optional(),
        contactNumber: _zod.z.string().optional()
    })
});
const authorValidationSchemas = {
    updateAuthorSchema
};
