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
    get default () {
        return openApi;
    },
    get registerRoute () {
        return registerRoute;
    }
});
const _zodtoopenapi = require("@asteasolutions/zod-to-openapi");
const registeredRoutes = [];
function openApi(config) {
    const registry = new _zodtoopenapi.OpenAPIRegistry();
    registeredRoutes.forEach(({ method, path, body, query, summary, description, tags })=>{
        registry.registerPath({
            method,
            path,
            summary,
            description,
            tags,
            request: {
                ...body && {
                    body: {
                        content: {
                            'application/json': {
                                schema: body
                            }
                        }
                    }
                },
                query: query
            },
            responses: {
                200: {
                    description: 'Success'
                }
            }
        });
    });
    return new _zodtoopenapi.OpenApiGeneratorV3(registry.definitions).generateDocument(config);
}
function registerRoute(meta) {
    registeredRoutes.push(meta);
}
