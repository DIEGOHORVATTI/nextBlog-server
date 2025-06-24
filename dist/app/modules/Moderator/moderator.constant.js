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
    get moderatorSearchableFields () {
        return moderatorSearchableFields;
    },
    get moderatorValidParams () {
        return moderatorValidParams;
    }
});
const moderatorSearchableFields = [
    'name',
    'email'
];
const moderatorValidParams = [
    'q',
    'name',
    'email'
];
