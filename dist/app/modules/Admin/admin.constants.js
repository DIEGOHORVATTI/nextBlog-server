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
    get searchableFields () {
        return searchableFields;
    },
    get validParams () {
        return validParams;
    }
});
const searchableFields = [
    'name',
    'email'
];
const validParams = [
    'q',
    'name',
    'email'
];
