"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createMethodFactory", {
    enumerable: true,
    get: function() {
        return createMethodFactory;
    }
});
function createMethodFactory(register) {
    const createMethod = (method)=>(path, handler, options)=>register(method, path, handler, options);
    return {
        get: createMethod('get'),
        post: createMethod('post'),
        put: createMethod('put'),
        patch: createMethod('patch'),
        delete: createMethod('delete')
    };
}
