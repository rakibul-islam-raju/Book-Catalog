import express from 'express';
import { userRouter } from '../apps/user/user.route';
import { authRouter } from '../apps/auth/auth.route';
import { bookRouter } from '../apps/book/book.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/books', bookRouter);

export default router;
