import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { bookService } from './book.service';
import { sendResponse } from '../../utils/sendResponse';
import { pickQueryParams } from '../../utils/pagination/pickQueryParams';
import { bookFilterOptions } from './book.constants';
import { paginationOptions } from '../../utils/pagination/pagination.constant';

const createBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const bookData = req.body;
    const requestedUser = req.user;
    console.log('requestedUser =>', requestedUser);
    const userId = requestedUser?.id;
    const newBook = await bookService.createNewBook(bookData, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book created successfully',
      data: newBook,
    });
  }
);

const updateBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id: bookId } = req.params;
    const data = req.body;
    const requestedUser = req.user;
    const userId = requestedUser?.id;

    const updatedBook = await bookService.updateBook(data, bookId, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  }
);

const getBooks: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pickQueryParams(req.query, bookFilterOptions);

    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const books = await bookService.getAllBooks(filters, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Books retrieved successfully',
      meta: books?.meta,
      data: books.data,
    });
  }
);

const getSingleBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const book = await bookService.getBook(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book retrieved successfully',
      data: book,
    });
  }
);

const deleteBook: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id: bookId } = req.params;
    const requestedUser = req.user;
    const userId = requestedUser?.id;

    const deletedBook = await bookService.deleteBook(bookId, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book deleted successfully',
      data: deletedBook,
    });
  }
);

export const bookController = {
  createBook,
  updateBook,
  getBooks,
  getSingleBook,
  deleteBook,
};
