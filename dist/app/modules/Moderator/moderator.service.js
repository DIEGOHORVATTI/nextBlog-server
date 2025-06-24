"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModeratorService", {
    enumerable: true,
    get: function() {
        return ModeratorService;
    }
});
const _client = require("@prisma/client");
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
const _paginationHelpers = require("../../../helpers/paginationHelpers");
const _moderatorconstant = require("./moderator.constant");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getAllModeratorFomDB = async (queryParams, paginationAndSortingQueryParams)=>{
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
        const searchConditions = _moderatorconstant.moderatorSearchableFields.map((field)=>({
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
    const result = await _prismaClient.default.moderator.findMany({
        where: {
            AND: conditions
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = await _prismaClient.default.moderator.count({
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
const getSingleModeratorFromDB = async (id)=>{
    return await _prismaClient.default.moderator.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
};
const updateModeratorIntoDB = async (id, data)=>{
    const moderatorData = await _prismaClient.default.moderator.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    if (data.name) {
        await _prismaClient.default.user.update({
            where: {
                email: moderatorData.email
            },
            data: {
                name: data.name
            }
        });
    }
    if (data.profilePhoto) {
        await _prismaClient.default.user.update({
            where: {
                email: moderatorData.email
            },
            data: {
                profilePhoto: data.profilePhoto
            }
        });
    }
    const result = await _prismaClient.default.$transaction(async (tx)=>{
        const updatedModerator = await tx.moderator.update({
            where: {
                id
            },
            data
        });
        if (data.profilePhoto) {
            await tx.user.update({
                where: {
                    email: moderatorData.email
                },
                data: {
                    profilePhoto: data.profilePhoto
                }
            });
        }
        return updatedModerator;
    });
    return result;
};
const deleteModeratorFromDB = async (id)=>{
    await _prismaClient.default.moderator.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    return await _prismaClient.default.$transaction(async (trClient)=>{
        const deletedModerator = await trClient.moderator.delete({
            where: {
                id
            }
        });
        await trClient.user.delete({
            where: {
                email: deletedModerator.email
            }
        });
        return deletedModerator;
    });
};
const softDeleteModeratorFromDB = async (id)=>{
    await _prismaClient.default.moderator.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    return await _prismaClient.default.$transaction(async (trClient)=>{
        const ModeratorDeletedData = await trClient.moderator.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        });
        await trClient.user.update({
            where: {
                email: ModeratorDeletedData.email
            },
            data: {
                status: _client.UserStatus.DELETED
            }
        });
        return ModeratorDeletedData;
    });
};
const ModeratorService = {
    getAllModeratorFomDB,
    getSingleModeratorFromDB,
    updateModeratorIntoDB,
    deleteModeratorFromDB,
    softDeleteModeratorFromDB
};
