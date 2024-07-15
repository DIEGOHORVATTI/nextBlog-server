import {
  Blog,
  Prisma,
  Published_status,
  UserRole,
  Visibility,
} from '@prisma/client';
import prisma from '../../../shared/prismaClient';
import { IBlogFilterParams } from './blog.interface';
import {
  IPaginationParams,
  ISortingParams,
} from '../../interfaces/paginationSorting';
import { generatePaginateAndSortOptions } from '../../../helpers/paginationHelpers';
import { blogSearchableFields } from './blog.constant';
import { HTTPError } from '../../errors/HTTPError';
import httpStatus from 'http-status';

const craeteBlogIntoDb = async (payload: Blog, user: any) => {
  console.log({ user });
  const authorData = await prisma.author.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.blog.create({
    data: { ...payload, authorId: authorData.id },
  });
  return result;
};

// const getAllBlogFomDB = async (
//   queryParams: IBlogFilterParams,
//   paginationAndSortingQueryParams: IPaginationParams & ISortingParams
// ) => {
//   const { q, ...otherQueryParams } = queryParams;

//   const { limit, skip, page, sortBy, sortOrder } =
//     generatePaginateAndSortOptions({
//       ...paginationAndSortingQueryParams,
//     });

//   //  const conditions: Prisma.BlogWhereInput[] = [];
//   const conditions: Prisma.BlogWhereInput[] = [];

//   // filtering out the soft deleted users
//   conditions.push({
//     visibility: Visibility.PUBLIC,
//   });

//   //@ searching
//   if (q) {
//     const searchConditions = blogSearchableFields.map((field) => ({
//       [field]: { contains: q, mode: "insensitive" },
//     }));
//     conditions.push({ OR: searchConditions });
//   }

//   //@ filtering with exact value
//   if (Object.keys(otherQueryParams).length > 0) {
//     const filterData = Object.keys(otherQueryParams).map((key) => ({
//       [key]: (otherQueryParams as any)[key],
//     }));
//     conditions.push(...filterData);
//   }

//   const result = await prisma.blog.findMany({
//     where: { AND: conditions },
//     skip,
//     take: limit,
//     orderBy: {
//       [sortBy]: sortOrder,
//     },
//     include: {
//       author: true,
//     },
//   });

//   const total = await prisma.blog.count({
//     where: { AND: conditions },
//   });

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     result,
//   };
// };

const getAllBlogFomDB = async (
  queryParams: IBlogFilterParams,
  paginationAndSortingQueryParams: IPaginationParams & ISortingParams,
) => {
  const { q, tag, ...otherQueryParams } = queryParams; // Destructure tag from queryParams

  const { limit, skip, page, sortBy, sortOrder } =
    generatePaginateAndSortOptions({
      ...paginationAndSortingQueryParams,
    });

  const conditions: Prisma.BlogWhereInput[] = [];

  // filtering out the soft deleted users
  conditions.push({
    visibility: Visibility.PUBLIC,
  });

  // Searching
  if (q) {
    const searchConditions = blogSearchableFields.map((field) => ({
      [field]: { contains: q, mode: 'insensitive' },
    }));
    conditions.push({ OR: searchConditions });
  }

  // Filtering with exact value
  if (Object.keys(otherQueryParams).length > 0) {
    const filterData = Object.keys(otherQueryParams).map((key) => ({
      [key]: (otherQueryParams as any)[key],
    }));
    conditions.push(...filterData);
  }

  // Filtering by tag name
  if (tag) {
    conditions.push({
      tag: {
        some: {
          name: {
            contains: tag,
            mode: 'insensitive',
          },
        },
      },
    });
  }

  const result = await prisma.blog.findMany({
    where: { AND: conditions },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      author: true,
      tag: true, // Include tags in the result
    },
  });

  const total = await prisma.blog.count({
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
};

const getSingleBlogFromDB = async (id: string, user: any) => {
  console.log({ user });
  const blogPost = await prisma.$transaction(async (tx) => {
    let includeOptions = {};

    const post = await tx.blog.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        comment: true,
        tag: true,
      },
    });

    // Increment views within the transaction
    await tx.blog.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return post;
  });

  return blogPost;
};

const getMyAllBlogsFomDB = async (
  queryParams: IBlogFilterParams,
  paginationAndSortingQueryParams: IPaginationParams & ISortingParams,
  user: any,
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.userId,
    },
  });

  const authorData = await prisma.author.findUniqueOrThrow({
    where: {
      email: userData.email,
    },
  });

  const { q, ...otherQueryParams } = queryParams;

  const { limit, skip, page, sortBy, sortOrder } =
    generatePaginateAndSortOptions({
      ...paginationAndSortingQueryParams,
    });

  //  const conditions: Prisma.BlogWhereInput[] = [];
  const conditions: Prisma.BlogWhereInput[] = [];

  // filtering out the soft deleted users
  conditions.push({
    visibility: Visibility.PUBLIC,
  });

  //@ searching
  if (q) {
    const searchConditions = blogSearchableFields.map((field) => ({
      [field]: { contains: q, mode: 'insensitive' },
    }));
    conditions.push({ OR: searchConditions });
  }

  //@ filtering with exact value
  if (Object.keys(otherQueryParams).length > 0) {
    const filterData = Object.keys(otherQueryParams).map((key) => ({
      [key]: (otherQueryParams as any)[key],
    }));
    conditions.push(...filterData);
  }

  const result = await prisma.blog.findMany({
    where: {
      AND: [...conditions, { authorId: authorData.id }],
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.blog.count({
    where: {
      AND: [...conditions, { authorId: authorData.id }],
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};

const deleteBlogFromDB = async (id: string) => {
  // Use a Prisma transaction to ensure atomicity
  const result = await prisma.$transaction(async (tx) => {
    // Delete all comments associated with the blog
    await tx.comment.deleteMany({
      where: {
        blogId: id,
      },
    });
    await tx.like.deleteMany({
      where: {
        blogId: id,
      },
    });

    // Delete the blog
    const deleteBlog = await tx.blog.delete({
      where: {
        id,
      },
    });

    // Return the deleted blog
    return deleteBlog;
  });

  return result;
};

const updateBlogIntoDB = async (
  id: string,
  data: Partial<Blog>,
): Promise<Blog> => {
  await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.blog.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const changeApprovalStatusDB = async (
  id: string,
  data: Partial<Blog>,
): Promise<Blog> => {
  await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const isCancel = await prisma.blog.findUnique({
    where: {
      id,
      publishedStatus: Published_status.CANCEL,
    },
  });

  if (isCancel) {
    throw new HTTPError(
      httpStatus.BAD_REQUEST,
      'Can not updated its status is cancel',
    );
  }

  console.log(isCancel);

  const result = await prisma.blog.update({
    where: {
      id,
      NOT: {
        publishedStatus: {
          in: [Published_status.CANCEL],
        },
      },
    },
    data,
  });

  return result;
};

const countVote = async (id: any, action: string) => {
  console.log(id, action);

  // Find the blog post by its unique ID
  const blog = await prisma.blog.findUnique({
    where: {
      id: id,
    },
  });

  // Throw an error if the blog post is not found
  if (!blog) {
    throw new Error('Blog not found');
  }

  // Check if blog.votes is not null before updating
  if (blog.votes !== null) {
    // Update the votes based on the action
    if (action === 'upvote') {
      blog.votes += 1;
    } else if (action === 'downvote') {
      blog.votes -= 1;
    } else {
      throw new Error('Invalid action');
    }
  } else {
    throw new Error('Votes cannot be null');
  }

  // Save the updated blog post with the new vote count
  const updatedBlog = await prisma.blog.update({
    where: {
      id: id,
    },
    data: {
      votes: blog.votes, // blog.votes is guaranteed to be a number here
    },
  });

  return updatedBlog.votes;
};

const getSingleBlogBYModerator = async (id: string) => {
  const blogData = await prisma.blog.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });

  return blogData;
};

export const blogServicres = {
  getAllBlogFomDB,
  craeteBlogIntoDb,
  getSingleBlogFromDB,
  getMyAllBlogsFomDB,
  deleteBlogFromDB,
  updateBlogIntoDB,
  changeApprovalStatusDB,
  getSingleBlogBYModerator,
  countVote,
};
