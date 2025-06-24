"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userValidationSchema", {
    enumerable: true,
    get: function() {
        return userValidationSchema;
    }
});
const _zod = require("zod");
const createAdminSchema = _zod.z.object({
    body: _zod.z.object({
        password: _zod.z.string(),
        email: _zod.z.string().email(),
        name: _zod.z.string(),
        contactNumber: _zod.z.string()
    })
});
const createAuthorSchema = _zod.z.object({
    body: _zod.z.object({
        password: _zod.z.string(),
        email: _zod.z.string().email(),
        name: _zod.z.string(),
        contactNumber: _zod.z.string(),
        gender: _zod.z.enum([
            'MALE',
            'FEMALE'
        ])
    })
});
const createModaratorSchema = _zod.z.object({
    body: _zod.z.object({
        password: _zod.z.string(),
        email: _zod.z.string().email(),
        name: _zod.z.string(),
        contactNumber: _zod.z.string(),
        gender: _zod.z.enum([
            'MALE',
            'FEMALE'
        ])
    })
});
const userUpdateStatus = _zod.z.object({
    body: _zod.z.object({
        status: _zod.z.enum([
            'ACTIVE',
            'BLOCKED',
            'DELETED'
        ])
    })
});
const userValidationSchema = {
    createAdminSchema,
    userUpdateStatus,
    createAuthorSchema,
    createModaratorSchema
};
