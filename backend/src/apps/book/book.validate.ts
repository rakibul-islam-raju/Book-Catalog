import { z } from 'zod';

const createBookZodValidateSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publishYear: z.string({
      required_error: 'Publish year is required',
    }),
  }),
});

const updateBookZodValidateSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    genre: z.string().optional(),
    publishYear: z.string().optional(),
  }),
});

export const bookValidationSchema = {
  createBookZodValidateSchema,
  updateBookZodValidateSchema,
};
