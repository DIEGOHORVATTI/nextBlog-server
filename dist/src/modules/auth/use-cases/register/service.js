"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "register", {
    enumerable: true,
    get: function() {
        return register;
    }
});
const _prisma = require("../../../../lib/prisma");
const _error = require("../../../../errors/error");
const _auth = require("../../../../lib/auth");
async function register({ email, password, name, role }) {
    const existingUser = await _prisma.prisma.user.findUnique({
        where: {
            email
        }
    });
    if (existingUser) {
        throw (0, _error.error)('CONFLICT', {
            error: 'Email already registered'
        });
    }
    const hashedPassword = await (0, _auth.hashPassword)(password);
    const authenticatedUser = await _prisma.prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: role || 'USER'
        }
    });
    const { password: _password, ...user } = authenticatedUser;
    const token = (0, _auth.generateToken)(user);
    return {
        user,
        token
    };
}
