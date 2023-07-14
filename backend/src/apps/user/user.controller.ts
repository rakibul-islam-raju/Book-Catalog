import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;

    const user = await userService.createNewUser(userData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User created successfully',
      data: user,
    });
  }
);

export const userController = {
  createUser,
};
