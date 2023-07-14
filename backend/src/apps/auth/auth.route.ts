import express from 'express';
import { validateRequestWithZod } from '../../middleware/zodValidator';
import { authValidationSchema } from './auth.validate';
import { authController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequestWithZod(authValidationSchema.loginZodValidateSchema),
  authController.loginUser
);

export const authRouter = router;
