import { Document, Model, Schema } from 'mongoose';
import { GENRES } from './book.constants';

export type GenreType = (typeof GENRES)[number];

export type IBook = Document & {
  title: string;
  author: Schema.Types.ObjectId;
  genre: GenreType;
  publishYear: string;
};

export type IBookMethods = object;

export type BookModel = Model<IBook, object, IBookMethods>;

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publishYear?: string;
};
