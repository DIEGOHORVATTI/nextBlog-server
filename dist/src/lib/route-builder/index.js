"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouteBuilder", {
    enumerable: true,
    get: function() {
        return RouteBuilder;
    }
});
const _express = require("express");
const _use = require("./core/use");
const _register = require("./core/register");
const _methodfactory = require("./core/method-factory");
class RouteBuilder {
    router = (0, _express.Router)();
    middlewares = [];
    prefix;
    name;
    tags;
    constructor(options){
        this.prefix = options?.prefix ?? '';
        this.name = options?.name ?? '';
        this.tags = options?.tags ?? [];
        this.router = options?.router ?? (0, _express.Router)();
        this.middlewares = options?.middlewares ?? [];
    }
    use(typed) {
        this.middlewares.push((0, _use.createUseHandler)(typed));
        return this;
    }
    group(options) {
        return new RouteBuilder({
            prefix: this.prefix + (options.prefix ?? ''),
            tags: [
                ...this.tags,
                ...options.tags ?? []
            ],
            router: this.router,
            name: this.name,
            middlewares: this.middlewares
        });
    }
    get _register() {
        return (0, _register.createRegister)(this.middlewares, this.router, this.prefix, this.tags);
    }
    get = (path, handler, options)=>(0, _methodfactory.createMethodFactory)(this._register).get(path, handler, options);
    post = (path, handler, options)=>(0, _methodfactory.createMethodFactory)(this._register).post(path, handler, options);
    put = (path, handler, options)=>(0, _methodfactory.createMethodFactory)(this._register).put(path, handler, options);
    patch = (path, handler, options)=>(0, _methodfactory.createMethodFactory)(this._register).patch(path, handler, options);
    delete = (path, handler, options)=>(0, _methodfactory.createMethodFactory)(this._register).delete(path, handler, options);
    export() {
        return this.router;
    }
}
