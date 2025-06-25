"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCategoryService", {
    enumerable: true,
    get: function() {
        return getCategoryService;
    }
});
const _result = require("../../../../lib/result");
const _prisma = require("../../../../lib/prisma");
const getCategoryService = async (id)=>{
    const category = await _prisma.prisma.category.findUnique({
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
    if (!category) {
        return (0, _result.error)('NOT_FOUND', 'Category not found');
    }
    return category;
};
