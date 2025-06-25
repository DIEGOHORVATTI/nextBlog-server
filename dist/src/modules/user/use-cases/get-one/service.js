"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getUserByIdService", {
    enumerable: true,
    get: function() {
        return getUserByIdService;
    }
});
const _prisma = require("../../../../lib/prisma");
async function getUserByIdService(id) {
    const { password, ...user } = await _prisma.prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });
    return {
        user
    };
}
