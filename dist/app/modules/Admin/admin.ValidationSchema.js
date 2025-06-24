"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "adminValidationSchemas", {
    enumerable: true,
    get: function() {
        return adminValidationSchemas;
    }
});
const _zod = require("zod");
const update = _zod.z.object({
    body: _zod.z.object({
        name: _zod.z.string().optional(),
        contactNumber: _zod.z.string().optional(),
        address: _zod.z.string().optional(),
        profilePhoto: _zod.z.string().optional(),
        gender: _zod.z.enum([
            'MALE',
            'FEMALE'
        ]).optional()
    })
});
const adminValidationSchemas = {
    update
};
