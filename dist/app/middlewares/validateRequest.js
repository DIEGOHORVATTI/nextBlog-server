"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRequest", {
    enumerable: true,
    get: function() {
        return validateRequest;
    }
});
const validateRequest = (schema)=>{
    return async (req, _res, next)=>{
        try {
            await schema.parseAsync(req);
            next();
        } catch (error) {
            next(error);
        }
    };
};
