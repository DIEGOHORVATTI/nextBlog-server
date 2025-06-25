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
    get createBodyParser () {
        return createBodyParser;
    },
    get createQueryParser () {
        return createQueryParser;
    }
});
function createBodyParser(schema) {
    return (req, res, next)=>{
        const result = schema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                error: 'Invalid body',
                issues: result.error.issues
            });
        }
        req.body = result.data;
        next();
    };
}
function createQueryParser(schema) {
    return (req, res, next)=>{
        const result = schema.safeParse(req.query);
        if (!result.success) {
            res.status(400).json({
                error: 'Invalid query',
                issues: result.error.issues
            });
        }
        req.query = result.data;
        next();
    };
}
