import express from 'express';
import { userRouter } from '../apps/user/user.route';
import { authRouter } from '../apps/auth/auth.route';
import { bookRouter } from '../apps/book/book.route';
import { reviewRouter } from '../apps/review/review.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/books', bookRouter);
router.use('/reviews', reviewRouter);

export default router;
