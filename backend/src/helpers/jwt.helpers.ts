import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { IUser } from '../apps/user/user.interface';

type PayloadData = { id?: string } & IUser;

const createToken = (
  payload: PayloadData,
  secret: Secret,
  expireTime: string
): string => {
  const data = {
    id: payload.id,
    email: payload.email,
    firstName: payload.email,
    lastName: payload.lastName,
  };

  return jwt.sign({ user: data }, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
