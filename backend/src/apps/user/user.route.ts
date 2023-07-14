import express from 'express';
import { userValidationSchema } from './user.validate';
import { userController } from './user.controller';
import { validateRequestWithZod } from '../../middleware/zodValidator';

const router = express.Router();

router.post(
  '/',
  validateRequestWithZod(userValidationSchema.createUserZodValidateSchema),
  userController.createUser
);

export const userRouter = router;
