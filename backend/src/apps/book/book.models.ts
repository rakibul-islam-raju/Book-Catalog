import { Schema, model } from 'mongoose';
import { IBook, BookModel } from './book.interface';
import { GENRES } from './book.constants';

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: GENRES,
    },
    publishYear: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Book = model<IBook, BookModel>('Book', bookSchema);

export default Book;
