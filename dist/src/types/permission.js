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
    get CALENDAR_PERMISSIONS () {
        return CALENDAR_PERMISSIONS;
    },
    get EVENT_PERMISSIONS () {
        return EVENT_PERMISSIONS;
    },
    get POSITION_PERMISSIONS () {
        return POSITION_PERMISSIONS;
    }
});
const EVENT_PERMISSIONS = [
    'events:create',
    'events:read',
    'events:update',
    'events:delete',
    'events:list',
    'events:share',
    'events:view_all',
    'events:assign',
    'events:export',
    'events:import',
    'events:moderate'
];
const POSITION_PERMISSIONS = [
    'positions:create',
    'positions:read',
    'positions:update',
    'positions:delete',
    'positions:list',
    'positions:assign',
    'positions:manage'
];
const CALENDAR_PERMISSIONS = [
    'calendar:create',
    'calendar:read',
    'calendar:update',
    'calendar:delete',
    'calendar:list',
    'calendar:share',
    'calendar:export',
    'calendar:view_all'
];
