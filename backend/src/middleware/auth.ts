import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { ApiError } from '../utils/errors/errors.clsses';
import { jwtHelpers } from '../helpers/jwt.helpers';
import config from '../config';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.JWT_SECRET as Secret
      );

      req.user = verifiedUser.user;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
