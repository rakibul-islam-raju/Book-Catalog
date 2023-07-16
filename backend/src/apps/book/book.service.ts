import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import { IBook, IBookFilters } from './book.interface';
import Book from './book.models';
import { ApiError } from '../../utils/errors/errors.clsses';
import { IPaginationOptions } from '../../utils/pagination/pagination.interface';
import { PaginationHelpers } from '../../helpers/paginationHelper';
import { bookSearchableFields } from './book.constants';

const createNewBook = async (
  bookData: IBook,
  userId: string
): Promise<IBook | null> => {
  const newBook = new Book({ ...bookData, author: userId });
  await newBook.save();
  return newBook.populate('author');
};

const updateBook = async (
  bookData: Partial<IBook>,
  id: string,
  userId: string
): Promise<IBook | null> => {
  // find the book
  const book = await Book.findOne({ _id: id });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found.');
  }

  // check if requested user is the author of the book
  if (String(book?.author) !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
  }

  // update book
  const updatedBook = await Book.findOneAndUpdate({ _id: id }, bookData, {
    new: true,
  }).populate('author');

  return updatedBook;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationParams: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.generatePaginationAndSortFields(paginationParams);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  let filterConditions = {};
  const searchableFields: string[] = bookSearchableFields;

  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map((field: string) => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        };
      }),
    });

    filterConditions = { $and: andConditions };
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => {
        return { [field]: value };
      }),
    });

    filterConditions = { $and: andConditions };
  }

  const books = await Book.find(filterConditions)
    .populate('author')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = books?.length ?? 0;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: books,
  };
};

const getBook = async (id: string): Promise<IBook | null> => {
  const book = await Book.findById(id).populate('author');
  return book;
};

const deleteBook = async (
  id: string,
  userId: string
): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: id });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found.');
  }

  if (String(book?.author) !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
  }

  const deletedBook = await Book.findByIdAndDelete(id).populate('author');
  return deletedBook;
};

export const bookService = {
  createNewBook,
  updateBook,
  getAllBooks,
  getBook,
  deleteBook,
};
