"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCategoryService", {
    enumerable: true,
    get: function() {
        return createCategoryService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _error = require("../../../../errors/error");
const createCategoryService = async ({ name, description, color })=>{
    const existingCategory = await _prisma.prisma.category.findUnique({
        where: {
            name
        }
    });
    if (existingCategory) {
        (0, _error.error)('CONFLICT', {
            error: 'Category already exists',
            details: 'A category with this name already exists'
        });
    }
    const category = await _prisma.prisma.category.create({
        data: {
            name,
            description,
            color
        }
    });
    return category;
};
