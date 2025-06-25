"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createRegister", {
    enumerable: true,
    get: function() {
        return createRegister;
    }
});
const _docs = require("../lib/docs");
const _parsers = require("./parsers");
function createRegister(middlewares, router, prefix = '', tags = []) {
    return (method, path, handler, options)=>{
        const middleware = [];
        if (options?.body) {
            middleware.push((0, _parsers.createBodyParser)(options.body));
        }
        if (options?.query) {
            middleware.push((0, _parsers.createQueryParser)(options.query));
        }
        const fullPath = prefix + path;
        (0, _docs.registerRoute)({
            method,
            path: fullPath,
            ...options,
            tags: options?.tags ?? tags,
            prefix
        });
        const expressHandler = async (req, res, next)=>{
            try {
                const result = await handler(req, res);
                if (!res.headersSent && result !== undefined) {
                    res.json(result);
                }
            } catch (err) {
                next(err);
            }
        };
        router[method](fullPath, ...middlewares, ...middleware, expressHandler);
    };
}
