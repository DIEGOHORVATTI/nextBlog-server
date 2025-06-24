// import httpStatus from 'http-status';
// import prisma from '../../../shared/prismaClient';
// import { HTTPError } from '../../errors/HTTPError';
// import { Tag } from '@prisma/client';
// const addTag = async (data: Tag) => {
//   const blogData = await prisma.blog.findUnique({
//     where: {
//       id: data.blogId,
//     },
//   });
//   if (!blogData) {
//     throw new HTTPError(httpStatus.BAD_REQUEST, 'Blog not found');
//   }
//   const existTag=await prisma.tag.findUnique({
//     where:{
//       name:data.name
//     }
//   })
//   if(existTag){
//     throw new HTTPError(httpStatus.BAD_REQUEST,'This tag already added')
//   }
//   const result = await prisma.tag.create({
//     data,
//   });
//   return result;
// };
// export const TagServices = {
//   addTag,
// };
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TagServices", {
    enumerable: true,
    get: function() {
        return TagServices;
    }
});
const _httpstatus = /*#__PURE__*/ _interop_require_default(require("http-status"));
const _prismaClient = /*#__PURE__*/ _interop_require_default(require("../../../shared/prismaClient"));
const _HTTPError = require("../../errors/HTTPError");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const addTag = async (data)=>{
    // Check if blogId is provided
    if (!data.blogId) {
        throw new _HTTPError.HTTPError(_httpstatus.default.BAD_REQUEST, 'Blog ID must be provided');
    }
    const blogData = await _prismaClient.default.blog.findUnique({
        where: {
            id: data.blogId
        }
    });
    if (!blogData) {
        throw new _HTTPError.HTTPError(_httpstatus.default.BAD_REQUEST, 'Blog not found');
    }
    const existTag = await _prismaClient.default.tag.findUnique({
        where: {
            name: data.name
        }
    });
    if (existTag) {
        throw new _HTTPError.HTTPError(_httpstatus.default.BAD_REQUEST, 'This tag already added');
    }
    const result = await _prismaClient.default.tag.create({
        data
    });
    return result;
};
const getAllTags = async ()=>{
    const result = await _prismaClient.default.tag.findMany({});
    return result;
};
const TagServices = {
    addTag,
    getAllTags
};
