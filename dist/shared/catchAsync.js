"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const catchAsync = (controller)=>{
    return async (req, res, next)=>{
        try {
            await controller(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
const _default = catchAsync;
