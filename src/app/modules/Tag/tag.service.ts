import httpStatus from 'http-status';
import prisma from '../../../shared/prismaClient';
import { HTTPError } from '../../errors/HTTPError';
import { Tag } from '@prisma/client';

const addTag = async (data: Tag) => {
  const blogData = await prisma.blog.findUnique({
    where: {
      id: data.blogId,
    },
  });
  if (!blogData) {
    throw new HTTPError(httpStatus.BAD_REQUEST, 'Blog not found');
  }

  const result = await prisma.tag.create({
    data,
  });

  return result;
};

export const TagServices = {
  addTag,
};
