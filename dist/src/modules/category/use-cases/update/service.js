"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateCategoryService", {
    enumerable: true,
    get: function() {
        return updateCategoryService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _error = require("../../../../errors/error");
const updateCategoryService = async (id, { name, description, color })=>{
    const existingCategory = await _prisma.prisma.category.findUnique({
        where: {
            id
        }
    });
    if (!existingCategory) {
        return (0, _error.error)('NOT_FOUND', {
            error: 'Category not found',
            details: 'The requested category does not exist'
        });
    }
    if (name !== existingCategory.name) {
        const nameConflict = await _prisma.prisma.category.findUnique({
            where: {
                name
            }
        });
        if (nameConflict) {
            return (0, _error.error)('CONFLICT', {
                error: 'Category name already exists',
                details: 'A category with this name already exists'
            });
        }
    }
    const category = await _prisma.prisma.category.update({
        where: {
            id
        },
        data: {
            ...name && {
                name
            },
            ...description !== undefined && {
                description
            },
            ...color !== undefined && {
                color
            }
        }
    });
    const response = {
        ...category,
        createdAt: category.createdAt.toISOString(),
        updatedAt: category.updatedAt.toISOString()
    };
    return response;
};
