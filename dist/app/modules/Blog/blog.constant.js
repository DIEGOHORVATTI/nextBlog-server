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
    get blogSearchableFields () {
        return blogSearchableFields;
    },
    get blogValidParams () {
        return blogValidParams;
    }
});
const blogSearchableFields = [
    'title',
    'content',
    'category'
];
const blogValidParams = [
    'q',
    'category',
    'tag'
];
