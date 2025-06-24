"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "blogValidationSchema", {
    enumerable: true,
    get: function() {
        return blogValidationSchema;
    }
});
const _zod = require("zod");
const createBlog = _zod.z.object({
    body: _zod.z.object({
        title: _zod.z.string(),
        content: _zod.z.string(),
        conclusion: _zod.z.string(),
        image: _zod.z.string().optional(),
        authorId: _zod.z.string(),
        views: _zod.z.number().optional(),
        visibility: _zod.z.enum([
            'PUBLIC',
            'PRIVATE'
        ]),
        createdAt: _zod.z.string(),
        updatedAt: _zod.z.string()
    })
});
const updateBlog = _zod.z.object({
    body: _zod.z.object({
        title: _zod.z.string().optional(),
        content: _zod.z.string().optional(),
        category: _zod.z.string().optional(),
        conclusion: _zod.z.string().optional()
    })
});
const updateChangeApprovalStatusBlog = _zod.z.object({
    body: _zod.z.object({
        publishedStatus: _zod.z.enum([
            'APPROVED',
            'CANCEL'
        ]).optional()
    })
});
const blogValidationSchema = {
    createBlog,
    updateBlog,
    updateChangeApprovalStatusBlog
};
