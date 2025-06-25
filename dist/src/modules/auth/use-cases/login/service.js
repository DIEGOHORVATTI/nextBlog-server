"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "login", {
    enumerable: true,
    get: function() {
        return login;
    }
});
const _prisma = require("../../../../lib/prisma");
const _auth = require("../../../../lib/auth");
async function login({ email, password }) {
    const authenticatedUser = await _prisma.prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!authenticatedUser || !await (0, _auth.comparePassword)(password, authenticatedUser.password)) {
        throw new Error('Invalid email or password');
    }
    const token = (0, _auth.generateToken)(authenticatedUser);
    const { password: _password, ...user } = authenticatedUser;
    return {
        user,
        token
    };
}
