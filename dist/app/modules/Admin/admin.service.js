"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminService", {
    enumerable: true,
    get: function() {
        return AdminService;
    }
});
const _client = require("@prisma/client");
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
const _paginationHelpers = require("../../../helpers/paginationHelpers");
const _adminconstants = require("./admin.constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getAllAdminFomDB = async (queryParams, paginationAndSortingQueryParams)=>{
    const { q, ...otherQueryParams } = queryParams;
    const { limit, skip, page, sortBy, sortOrder } = (0, _paginationHelpers.generatePaginateAndSortOptions)({
        ...paginationAndSortingQueryParams
    });
    const conditions = [];
    // filtering out the soft deleted users
    conditions.push({
        isDeleted: false
    });
    //@ searching
    if (q) {
        const searchConditions = _adminconstants.searchableFields.map((field)=>({
                [field]: {
                    contains: q,
                    mode: 'insensitive'
                }
            }));
        conditions.push({
            OR: searchConditions
        });
    }
    //@ filtering with exact value
    if (Object.keys(otherQueryParams).length > 0) {
        const filterData = Object.keys(otherQueryParams).map((key)=>({
                [key]: otherQueryParams[key]
            }));
        conditions.push(...filterData);
    }
    const result = await _prismaClient.default.admin.findMany({
        where: {
            AND: conditions
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = await _prismaClient.default.admin.count({
        where: {
            AND: conditions
        }
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        result
    };
};
const getSingleAdminFromDB = async (id)=>{
    return await _prismaClient.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
};
const updateAdminIntoDB = async (id, data)=>{
    const adminData = await _prismaClient.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    if (data.name) {
        await _prismaClient.default.user.update({
            where: {
                email: adminData.email
            },
            data: {
                name: data.name
            }
        });
    }
    return await _prismaClient.default.admin.update({
        where: {
            id
        },
        data
    });
};
const deleteAdminFromDB = async (id)=>{
    await _prismaClient.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    return await _prismaClient.default.$transaction(async (trClient)=>{
        const deletedAdmin = await trClient.admin.delete({
            where: {
                id
            }
        });
        await trClient.user.delete({
            where: {
                email: deletedAdmin.email
            }
        });
        return deletedAdmin;
    });
};
const softDeleteAdminFromDB = async (id)=>{
    await _prismaClient.default.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    return await _prismaClient.default.$transaction(async (trClient)=>{
        const adminDeletedData = await trClient.admin.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        });
        await trClient.user.update({
            where: {
                email: adminDeletedData.email
            },
            data: {
                status: _client.UserStatus.DELETED
            }
        });
        return adminDeletedData;
    });
};
const AdminService = {
    getAllAdminFomDB,
    getSingleAdminFromDB,
    updateAdminIntoDB,
    deleteAdminFromDB,
    softDeleteAdminFromDB
};
