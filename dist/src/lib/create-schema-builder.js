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
    get createSchemaBuilder () {
        return createSchemaBuilder;
    },
    get z () {
        return _zod.z;
    }
});
const _zod = require("zod");
const _zodtoopenapi = require("@asteasolutions/zod-to-openapi");
(0, _zodtoopenapi.extendZodWithOpenApi)(_zod.z);
function createSchemaBuilder(map) {
    const shape = {};
    for(const key in map){
        shape[key] = map[key]().optional();
    }
    return _zod.z.object(shape);
}
