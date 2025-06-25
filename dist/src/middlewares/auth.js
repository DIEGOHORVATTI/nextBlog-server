"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "auth", {
    enumerable: true,
    get: function() {
        return auth;
    }
});
const _prisma = require("../lib/prisma");
const _auth = require("../lib/auth");
const _result = require("../lib/result");
const getUserFromToken = async (token)=>{
    try {
        const decoded = (0, _auth.verifyToken)(token);
        const user = await _prisma.prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        if (!user) return (0, _result.err)('Invalid token');
        if (!user.isActive) return (0, _result.err)('User is inactive');
        return (0, _result.ok)(decoded);
    } catch  {
        return (0, _result.err)('Invalid token');
    }
};
const auth = {
    middleware: async (req, _res, next)=>{
        const token = req.cookies?.token;
        if (!token) {
            return next((0, _result.error)('UNAUTHORIZED', 'Access denied. No token provided.'));
        }
        const result = await getUserFromToken(token);
        return (0, _result.match)(result, {
            ok: (user)=>{
                req.user = user;
                next();
            },
            err: (msg)=>{
                next((0, _result.error)('UNAUTHORIZED', msg));
            }
        });
    }
};
