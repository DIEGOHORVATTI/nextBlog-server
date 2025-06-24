"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "filterValidQueryParams", {
    enumerable: true,
    get: function() {
        return filterValidQueryParams;
    }
});
const filterValidQueryParams = (params, validParams)=>{
    const filteredParams = {};
    for (const key of validParams){
        if (Object.hasOwnProperty.call(params, key) && params[key]) {
            filteredParams[key] = params[key];
        }
    }
    return filteredParams;
};
