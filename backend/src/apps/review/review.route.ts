import express from 'express';
import auth from '../../middleware/auth';
import { validateRequestWithZod } from '../../middleware/zodValidator';
import { reviewValidationSchema } from './review.validate';
import { reviewController } from './review.controller';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequestWithZod(reviewValidationSchema.createReviewZodValidateSchema),
  reviewController.createReview
);
router.get('/:bookId', reviewController.getReviews);
router.get('/:id', reviewController.getSingleReview);
router.patch(
  '/:id',
  auth(),
  validateRequestWithZod(reviewValidationSchema.createReviewZodValidateSchema),
  reviewController.updateReview
);
router.delete('/:id', auth(), reviewController.deleteReview);

export const reviewRouter = router;
