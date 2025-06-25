"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUseHandler", {
    enumerable: true,
    get: function() {
        return createUseHandler;
    }
});
function createUseHandler(typed) {
    return async (req, res, next)=>{
        const request = req;
        await typed.middleware(request, res, next);
        Object.assign(request, typed.inject?.(request));
    };
}
