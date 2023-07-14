import express from 'express';
import { userRouter } from '../apps/user/user.route';
import { authRouter } from '../apps/auth/auth.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
