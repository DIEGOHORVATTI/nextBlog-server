"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "deleteCategoryService", {
    enumerable: true,
    get: function() {
        return deleteCategoryService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _error = require("../../../../errors/error");
const deleteCategoryService = async (id)=>{
    const existingCategory = await _prisma.prisma.category.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    posts: true
                }
            }
        }
    });
    if (!existingCategory) {
        throw (0, _error.error)('NOT_FOUND', {
            error: 'Category not found',
            details: 'The requested category does not exist'
        });
    }
    if (existingCategory._count.posts > 0) {
        throw (0, _error.error)('CONFLICT', {
            error: 'Cannot delete category with posts',
            details: 'This category has associated posts and cannot be deleted'
        });
    }
    await _prisma.prisma.category.delete({
        where: {
            id
        }
    });
};
