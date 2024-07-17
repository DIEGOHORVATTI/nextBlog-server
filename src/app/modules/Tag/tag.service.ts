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

import httpStatus from 'http-status';
import prisma from '../../../shared/prismaClient';
import { HTTPError } from '../../errors/HTTPError';
import { Tag } from '@prisma/client';

const addTag = async (data: Tag) => {
  // Check if blogId is provided
  if (!data.blogId) {
    throw new HTTPError(httpStatus.BAD_REQUEST, 'Blog ID must be provided');
  }

  const blogData = await prisma.blog.findUnique({
    where: {
      id: data.blogId,
    },
  });

  if (!blogData) {
    throw new HTTPError(httpStatus.BAD_REQUEST, 'Blog not found');
  }

  const existTag = await prisma.tag.findUnique({
    where: {
      name: data.name,
    },
  });

  if (existTag) {
    throw new HTTPError(httpStatus.BAD_REQUEST, 'This tag already added');
  }

  const result = await prisma.tag.create({
    data,
  });

  return result;
};

const getAllTags = async () => {
  const result = await prisma.tag.findMany({});
  return result;
};

export const TagServices = {
  addTag,
  getAllTags,
};
