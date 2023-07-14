import { z } from 'zod';

const createBookZodValidateSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publishDate: z.string({
      required_error: 'Publish date is required',
    }),
  }),
});

const updateBookZodValidateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    genre: z.string().optional(),
    publishDate: z.string().optional(),
  }),
});

export const bookValidationSchema = {
  createBookZodValidateSchema,
  updateBookZodValidateSchema,
};
