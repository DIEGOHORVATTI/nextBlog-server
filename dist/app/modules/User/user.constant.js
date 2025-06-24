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
    get userSearchableFields () {
        return userSearchableFields;
    },
    get userValidParams () {
        return userValidParams;
    }
});
const userSearchableFields = [
    'name',
    'email'
];
const userValidParams = [
    'q',
    'email',
    'isActive'
];
