"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "prisma", {
    enumerable: true,
    get: function() {
        return prisma;
    }
});
const _client = require("@prisma/client");
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new _client.PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL || 'file:./dev.db'
        }
    }
});
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
