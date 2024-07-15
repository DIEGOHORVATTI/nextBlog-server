"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../../../shared/prismaClient"));
const user_utils_1 = require("./user.utils");
const user_constant_1 = require("./user.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const HTTPError_1 = require("../../errors/HTTPError");
const http_status_1 = __importDefault(require("http-status"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, admin = __rest(payload, ["password"]);
    const hashPassword = yield (0, user_utils_1.hashedPassword)(password);
    const result = yield prismaClient_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield transactionClient.user.create({
            data: {
                email: admin.email,
                password: hashPassword,
                role: client_1.UserRole.ADMIN,
                name: admin.name,
                profilePhoto: admin.profilePhoto,
            },
        });
        console.log({ newUser });
        const newAdmin = yield transactionClient.admin.create({
            data: admin,
        });
        return newAdmin;
    }));
    return result;
});
const createAuthor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, author = __rest(payload, ["password"]);
    const hashPassword = yield (0, user_utils_1.hashedPassword)(password);
    const result = yield prismaClient_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield transactionClient.user.create({
            data: {
                email: author.email,
                password: hashPassword,
                role: client_1.UserRole.BLOGGER,
                name: author.name,
                profilePhoto: author.profilePhoto,
            },
        });
        const newAuthor = yield transactionClient.author.create({
            data: author,
        });
        return newAuthor;
    }));
    return result;
});
const createModarator = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, modarator = __rest(payload, ["password"]);
    const hashPassword = yield (0, user_utils_1.hashedPassword)(password);
    const result = yield prismaClient_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: {
                email: modarator.email,
                password: hashPassword,
                role: client_1.UserRole.MODERATOR,
                name: modarator.name,
                profilePhoto: modarator.profilePhoto,
            },
        });
        const newModarator = yield transactionClient.moderator.create({
            data: modarator,
        });
        return newModarator;
    }));
    return result;
});
const createSubscriber = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, subscriber = __rest(payload, ["password"]);
    const isExist = yield prismaClient_1.default.user.findUnique({
        where: {
            email: subscriber.email,
        },
    });
    if (isExist) {
        throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, 'The email already register');
    }
    const hashPassword = yield (0, user_utils_1.hashedPassword)(password);
    const result = yield prismaClient_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userCreate = yield transactionClient.user.create({
            data: {
                name: subscriber.name,
                email: subscriber.email,
                password: hashPassword,
                role: client_1.UserRole.SUBSCRIBER,
                profilePhoto: subscriber.profilePhoto,
            },
        });
        console.log({ userCreate });
        const newSubscriber = yield transactionClient.subscriber.create({
            data: subscriber,
        });
        return newSubscriber;
    }));
    return result;
});
const getAllUsersFromDb = (queryParams, paginationAndSortingQueryParams, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const { q } = queryParams, otherQueryParams = __rest(queryParams, ["q"]);
    const { limit, skip, page, sortBy, sortOrder } = (0, paginationHelpers_1.generatePaginateAndSortOptions)(Object.assign({}, paginationAndSortingQueryParams));
    const conditions = [];
    if (q) {
        const searchConditions = user_constant_1.userSearchableFields.map((field) => ({
            [field]: { contains: q, mode: 'insensitive' },
        }));
        conditions.push({ OR: searchConditions });
    }
    //@ filtering with exact value
    if (Object.keys(otherQueryParams).length > 0) {
        const filterData = Object.keys(otherQueryParams).map((key) => ({
            [key]: otherQueryParams[key],
        }));
        conditions.push(...filterData);
    }
    const result = yield prismaClient_1.default.user.findMany({
        where: { AND: conditions },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prismaClient_1.default.user.count({
        where: { AND: conditions },
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        result,
    };
});
const getMyProfile = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prismaClient_1.default.user.findUnique({
        where: {
            email: authUser.email,
            status: client_1.UserStatus.ACTIVE,
        },
        select: {
            email: true,
            role: true,
            passwordChangeRequired: true,
            status: true,
        },
    });
    let profileData;
    if ((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.ADMIN ||
        (userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.SUPER_ADMIN) {
        profileData = yield prismaClient_1.default.admin.findUnique({
            where: {
                email: userData.email,
            },
        });
    }
    else if ((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.BLOGGER) {
        profileData = yield prismaClient_1.default.author.findUnique({
            where: {
                email: userData.email,
            },
        });
    }
    else if ((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.MODERATOR) {
        profileData = yield prismaClient_1.default.moderator.findUnique({
            where: {
                email: userData.email,
            },
        });
    }
    return Object.assign(Object.assign({}, profileData), userData);
});
const updateMyProfile = (authUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: authUser.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (payload.profilePhoto) {
        yield prismaClient_1.default.user.update({
            where: {
                email: authUser.email,
            },
            data: {
                profilePhoto: payload.profilePhoto,
            },
        });
    }
    if (payload.name) {
        yield prismaClient_1.default.user.update({
            where: {
                email: authUser.email,
            },
            data: {
                name: payload.name,
            },
        });
    }
    let profileData;
    if ((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.ADMIN ||
        (userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.SUPER_ADMIN) {
        profileData = yield prismaClient_1.default.admin.update({
            where: {
                email: userData.email,
            },
            data: payload,
        });
    }
    else if ((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.BLOGGER) {
        profileData = yield prismaClient_1.default.author.update({
            where: {
                email: userData.email,
            },
            data: payload,
        });
    }
    else if ((userData === null || userData === void 0 ? void 0 : userData.role) === client_1.UserRole.MODERATOR) {
        profileData = yield prismaClient_1.default.moderator.update({
            where: {
                email: userData.email,
            },
            data: payload,
        });
    }
    return Object.assign(Object.assign({}, profileData), userData);
});
const changeProfileStatus = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prismaClient_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!isUserExist) {
        throw new HTTPError_1.HTTPError(http_status_1.default.BAD_REQUEST, 'User does not exists!');
    }
    const updatedUser = yield prismaClient_1.default.user.update({
        where: {
            id: userId,
        },
        data: status,
    });
    return updatedUser;
});
exports.userServices = {
    createAdmin,
    createAuthor,
    createModarator,
    createSubscriber,
    getAllUsersFromDb,
    getMyProfile,
    updateMyProfile,
    changeProfileStatus,
};
