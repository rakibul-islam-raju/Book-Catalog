/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password; // Exclude the password field from the serialized object
        return ret;
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  // hashing user pass
  const user = this;
  const saltRounds = Number(config.saltRounds) || 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
