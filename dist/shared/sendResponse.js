"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sendResponse", {
    enumerable: true,
    get: function() {
        return sendResponse;
    }
});
const sendResponse = (res, jsonData)=>{
    res.status(jsonData.statusCode).json({
        statusCode: jsonData.statusCode,
        success: jsonData.success,
        message: jsonData.message,
        meta: jsonData.meta || null || undefined,
        data: jsonData.data || null || undefined
    });
};
