import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { authService } from './auth.service';
import { catchAsync } from '../../utils/catchAsync';
import config from '../../config';
import { sendResponse } from '../../utils/sendResponse';

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const loginData = req.body;

    const result = await authService.login(loginData);

    const refreshToken = result?.refreshToken;
    const accessToken = result?.accessToken;

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User logged in successfully',
      data: { accessToken },
    });
  }
);

export const authController = {
  loginUser,
};
