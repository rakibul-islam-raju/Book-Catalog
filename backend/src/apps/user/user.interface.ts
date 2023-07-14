import { Model } from 'mongoose';

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type IUserMethods = object;

export type UserModel = Model<IUser, object, IUserMethods>;
