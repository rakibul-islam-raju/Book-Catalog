import express from 'express';
import auth from '../../middleware/auth';
import { validateRequestWithZod } from '../../middleware/zodValidator';
import { bookValidationSchema } from './book.validate';
import { bookController } from './book.controller';

const router = express.Router();

router.post(
  '/',
  auth(),
  validateRequestWithZod(bookValidationSchema.createBookZodValidateSchema),
  bookController.createBook
);
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getSingleBook);
router.patch(
  '/:id',
  auth(),
  validateRequestWithZod(bookValidationSchema.updateBookZodValidateSchema),
  bookController.updateBook
);
router.delete('/:id', auth(), bookController.deleteBook);

export const bookRouter = router;
