import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { TagServices } from './tag.service';

const addTag = catchAsync(async (req, res) => {
  const result = await TagServices.addTag(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tag created  successfully!',
    data: result,
  });
});
const getAllTags = catchAsync(async (req, res) => {
  const result = await TagServices.getAllTags();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tag created  successfully!',
    data: result,
  });
});

export const TagControllers = {
  addTag,
  getAllTags,
};
