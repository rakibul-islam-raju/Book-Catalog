import { z } from 'zod';

const createReviewZodValidateSchema = z.object({
  body: z.object({
    comment: z.string({
      required_error: 'Comment is required',
    }),
    book: z.string({
      required_error: 'Book is required',
    }),
  }),
});

export const reviewValidationSchema = {
  createReviewZodValidateSchema,
};
