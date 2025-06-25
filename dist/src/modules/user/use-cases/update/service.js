"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "updateUserService", {
    enumerable: true,
    get: function() {
        return updateUserService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _auth = require("../../../../lib/auth");
async function updateUserService(id, data) {
    if (data.password) {
        data.password = await (0, _auth.hashPassword)(data.password);
    }
    return _prisma.prisma.user.update({
        where: {
            id
        },
        data
    });
}
