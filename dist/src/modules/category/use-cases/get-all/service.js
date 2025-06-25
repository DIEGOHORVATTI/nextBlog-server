"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCategoriesService", {
    enumerable: true,
    get: function() {
        return getCategoriesService;
    }
});
const _prisma = require("../../../../lib/prisma");
const getCategoriesService = async ()=>{
    const categories = await _prisma.prisma.category.findMany({
        orderBy: {
            name: 'asc'
        },
        include: {
            _count: {
                select: {
                    posts: true
                }
            }
        }
    });
    return categories;
};
