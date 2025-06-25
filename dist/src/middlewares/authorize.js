"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authorize", {
    enumerable: true,
    get: function() {
        return authorize;
    }
});
const _result = require("../lib/result");
const authorize = (roles)=>({
        middleware: (req, _res, next)=>{
            if (!roles.includes(req.user.role)) {
                return next((0, _result.error)('FORBIDDEN', 'Insufficient permissions.'));
            }
            return next();
        }
    });
