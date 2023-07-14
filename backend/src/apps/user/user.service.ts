import User from './user.mode';
import { IUser } from './user.interface';

const createNewUser = async (user: IUser): Promise<IUser | null> => {
  const newUser = new User(user);
  await newUser.save();
  return newUser;
};

export const userService = {
  createNewUser,
};
