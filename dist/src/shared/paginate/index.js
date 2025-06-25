"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "paginate", {
    enumerable: true,
    get: function() {
        return paginate;
    }
});
const paginate = async (fetch, { page = 1, limit = 20 } = {})=>{
    const skip = (page - 1) * limit;
    const [data, total] = await fetch(skip, limit);
    return {
        data,
        total,
        page,
        limit,
        hasMore: skip + data.length < total
    };
};
