"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get default () {
        return _default;
    },
    get prisma () {
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
const _default = prisma;
