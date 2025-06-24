"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "moderatorValidationSchemas", {
    enumerable: true,
    get: function() {
        return moderatorValidationSchemas;
    }
});
const _zod = require("zod");
const updateModeratorSchema = _zod.z.object({
    body: _zod.z.object({
        name: _zod.z.string().optional(),
        contactNumber: _zod.z.string().optional()
    })
});
const moderatorValidationSchemas = {
    updateModeratorSchema
};
