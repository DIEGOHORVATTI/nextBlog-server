"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthorService", {
    enumerable: true,
    get: function() {
        return AuthorService;
    }
});
const _client = require("@prisma/client");
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
const _paginationHelpers = require("../../../helpers/paginationHelpers");
const _authorconstant = require("./author.constant");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getAllAuthorFomDB = async (queryParams, paginationAndSortingQueryParams)=>{
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
        const searchConditions = _authorconstant.authorSearchableFields.map((field)=>({
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
    const result = await _prismaClient.default.author.findMany({
        where: {
            AND: conditions
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = await _prismaClient.default.author.count({
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
const getSingleAuthorFromDB = async (id)=>{
    return await _prismaClient.default.author.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
};
// const updateAuthorIntoDB = async (
//    id: string,
//    data: Partial<Author>
// ): Promise<Author> => {
//    await prisma.author.findUniqueOrThrow({
//       where: {
//          id,
//          isDeleted: false,
//       },
//    });
//    return await prisma.author.update({
//       where: {
//          id,
//       },
//       data,
//    });
// };
const updateAuthorIntoDB = async (id, data)=>{
    const authorData = await _prismaClient.default.author.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    if (data.name) {
        await _prismaClient.default.user.update({
            where: {
                email: authorData.email
            },
            data: {
                name: data.name
            }
        });
    }
    if (data.profilePhoto) {
        await _prismaClient.default.user.update({
            where: {
                email: authorData.email
            },
            data: {
                profilePhoto: data.profilePhoto
            }
        });
    }
    const result = await _prismaClient.default.$transaction(async (tx)=>{
        const updatedModerator = await tx.author.update({
            where: {
                id
            },
            data
        });
        if (data.name) {
            await tx.user.update({
                where: {
                    email: authorData.email
                },
                data: {
                    //   profilePhoto: data.profilePhoto,
                    name: updatedModerator.name
                }
            });
        }
        return updatedModerator;
    });
    return result;
};
const deleteAuthorFromDB = async (id)=>{
    await _prismaClient.default.author.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    return await _prismaClient.default.$transaction(async (trClient)=>{
        const deletedAuthor = await trClient.author.delete({
            where: {
                id
            }
        });
        await trClient.user.delete({
            where: {
                email: deletedAuthor.email
            }
        });
        return deletedAuthor;
    });
};
const softDeleteAuthorFromDB = async (id)=>{
    await _prismaClient.default.author.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });
    return await _prismaClient.default.$transaction(async (trClient)=>{
        const authorDeletedData = await trClient.author.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        });
        await trClient.user.update({
            where: {
                email: authorDeletedData.email
            },
            data: {
                status: _client.UserStatus.DELETED
            }
        });
        return authorDeletedData;
    });
};
const AuthorService = {
    getAllAuthorFomDB,
    getSingleAuthorFromDB,
    updateAuthorIntoDB,
    deleteAuthorFromDB,
    softDeleteAuthorFromDB
};
