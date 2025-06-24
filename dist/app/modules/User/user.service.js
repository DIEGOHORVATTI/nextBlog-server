"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userServices", {
    enumerable: true,
    get: function() {
        return userServices;
    }
});
const _client = require("@prisma/client");
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
const _userutils = require("./user.utils");
const _userconstant = require("./user.constant");
const _paginationHelpers = require("../../../helpers/paginationHelpers");
const _HTTPError = require("../../errors/HTTPError");
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createAdmin = async (payload)=>{
    const { password, ...admin } = payload;
    const hashPassword = await (0, _userutils.hashedPassword)(password);
    const result = await _prismaClient.default.$transaction(async (transactionClient)=>{
        const newUser = await transactionClient.user.create({
            data: {
                email: admin.email,
                password: hashPassword,
                role: _client.UserRole.ADMIN,
                name: admin.name,
                profilePhoto: admin.profilePhoto
            }
        });
        console.log({
            newUser
        });
        const newAdmin = await transactionClient.admin.create({
            data: admin
        });
        return newAdmin;
    });
    return result;
};
const createAuthor = async (payload)=>{
    const { password, ...author } = payload;
    const hashPassword = await (0, _userutils.hashedPassword)(password);
    const result = await _prismaClient.default.$transaction(async (transactionClient)=>{
        const newUser = await transactionClient.user.create({
            data: {
                email: author.email,
                password: hashPassword,
                role: _client.UserRole.BLOGGER,
                name: author.name,
                profilePhoto: author.profilePhoto
            }
        });
        const newAuthor = await transactionClient.author.create({
            data: author
        });
        return newAuthor;
    });
    return result;
};
const createModarator = async (payload)=>{
    const { password, ...modarator } = payload;
    const hashPassword = await (0, _userutils.hashedPassword)(password);
    const result = await _prismaClient.default.$transaction(async (transactionClient)=>{
        await transactionClient.user.create({
            data: {
                email: modarator.email,
                password: hashPassword,
                role: _client.UserRole.MODERATOR,
                name: modarator.name,
                profilePhoto: modarator.profilePhoto
            }
        });
        const newModarator = await transactionClient.moderator.create({
            data: modarator
        });
        return newModarator;
    });
    return result;
};
const createSubscriber = async (payload)=>{
    const { password, ...subscriber } = payload;
    const isExist = await _prismaClient.default.user.findUnique({
        where: {
            email: subscriber.email
        }
    });
    if (isExist) {
        throw new _HTTPError.HTTPError(_httpstatus.default.BAD_REQUEST, 'The email already register');
    }
    const hashPassword = await (0, _userutils.hashedPassword)(password);
    const result = await _prismaClient.default.$transaction(async (transactionClient)=>{
        const userCreate = await transactionClient.user.create({
            data: {
                name: subscriber.name,
                email: subscriber.email,
                password: hashPassword,
                role: _client.UserRole.SUBSCRIBER,
                profilePhoto: subscriber.profilePhoto
            }
        });
        console.log({
            userCreate
        });
        const newSubscriber = await transactionClient.subscriber.create({
            data: subscriber
        });
        return newSubscriber;
    });
    return result;
};
const getAllUsersFromDb = async (queryParams, paginationAndSortingQueryParams, user)=>{
    console.log(user);
    const { q, ...otherQueryParams } = queryParams;
    const { limit, skip, page, sortBy, sortOrder } = (0, _paginationHelpers.generatePaginateAndSortOptions)({
        ...paginationAndSortingQueryParams
    });
    const conditions = [];
    if (q) {
        const searchConditions = _userconstant.userSearchableFields.map((field)=>({
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
    const result = await _prismaClient.default.user.findMany({
        where: {
            AND: conditions
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });
    const total = await _prismaClient.default.user.count({
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
const getMyProfile = async (authUser)=>{
    const userData = await _prismaClient.default.user.findUnique({
        where: {
            email: authUser.email,
            status: _client.UserStatus.ACTIVE
        },
        select: {
            email: true,
            role: true,
            passwordChangeRequired: true,
            status: true
        }
    });
    let profileData;
    if (userData?.role === _client.UserRole.ADMIN || userData?.role === _client.UserRole.SUPER_ADMIN) {
        profileData = await _prismaClient.default.admin.findUnique({
            where: {
                email: userData.email
            }
        });
    } else if (userData?.role === _client.UserRole.BLOGGER) {
        profileData = await _prismaClient.default.author.findUnique({
            where: {
                email: userData.email
            }
        });
    } else if (userData?.role === _client.UserRole.MODERATOR) {
        profileData = await _prismaClient.default.moderator.findUnique({
            where: {
                email: userData.email
            }
        });
    }
    return {
        ...profileData,
        ...userData
    };
};
const updateMyProfile = async (authUser, payload)=>{
    const userData = await _prismaClient.default.user.findUniqueOrThrow({
        where: {
            email: authUser.email,
            status: _client.UserStatus.ACTIVE
        }
    });
    if (payload.profilePhoto) {
        await _prismaClient.default.user.update({
            where: {
                email: authUser.email
            },
            data: {
                profilePhoto: payload.profilePhoto
            }
        });
    }
    if (payload.name) {
        await _prismaClient.default.user.update({
            where: {
                email: authUser.email
            },
            data: {
                name: payload.name
            }
        });
    }
    let profileData;
    if (userData?.role === _client.UserRole.ADMIN || userData?.role === _client.UserRole.SUPER_ADMIN) {
        profileData = await _prismaClient.default.admin.update({
            where: {
                email: userData.email
            },
            data: payload
        });
    } else if (userData?.role === _client.UserRole.BLOGGER) {
        profileData = await _prismaClient.default.author.update({
            where: {
                email: userData.email
            },
            data: payload
        });
    } else if (userData?.role === _client.UserRole.MODERATOR) {
        profileData = await _prismaClient.default.moderator.update({
            where: {
                email: userData.email
            },
            data: payload
        });
    }
    return {
        ...profileData,
        ...userData
    };
};
const changeProfileStatus = async (userId, status)=>{
    const isUserExist = await _prismaClient.default.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!isUserExist) {
        throw new _HTTPError.HTTPError(_httpstatus.default.BAD_REQUEST, 'User does not exists!');
    }
    const updatedUser = await _prismaClient.default.user.update({
        where: {
            id: userId
        },
        data: status
    });
    return updatedUser;
};
const userServices = {
    createAdmin,
    createAuthor,
    createModarator,
    createSubscriber,
    getAllUsersFromDb,
    getMyProfile,
    updateMyProfile,
    changeProfileStatus
};
