import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { ILoginData, ILoginUserResponse } from './auth.interface';
import User from '../user/user.mode';
import { ApiError } from '../../utils/errors/errors.clsses';
import { jwtHelpers } from '../../helpers/jwt.helpers';
import config from '../../config';

const login = async (
  payload: ILoginData
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  const passMatched = await bcrypt.compare(password, user.password);

  if (!passMatched) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Incorrent  password');
  }

  //   generate token
  const access = jwtHelpers.createToken(
    user,
    config.jwt.JWT_SECRET as Secret,
    config.jwt.JWT_EXPIRES_IN as string
  );

  const refreshToken = jwtHelpers.createToken(
    user,
    config.jwt.JWT_REFRESH_SECRET as Secret,
    config.jwt.JWT_REFRESH_EXPIRES_IN as string
  );

  return {
    access,
    refreshToken,
  };
};

// const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
//   let verifiedToken = null;

//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.JWT_REFRESH_SECRET as Secret
//     );
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   if (!verifiedToken) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
//   }

//   const { _id } = verifiedToken;
//   const user = await User.findOne(
//     { _id },
//     { _id: 1, password: 1, role: 1, phoneNumber: 1, name: 1 }
//   );

//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
//   }
//   //   generate token
//   const { firstName, lastName, email, id } = user;
//   const newaccess = jwtHelpers.createToken(
//     { firstName, lastName, email, id },
//     config.jwt.JWT_SECRET as Secret,
//     config.jwt.JWT_EXPIRES_IN as string
//   );
//   return {
//     access: newaccess,
//   };
// };

export const authService = {
  login,
};
