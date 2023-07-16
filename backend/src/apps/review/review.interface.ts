import { Document, Model, Schema } from 'mongoose';

export type IReview = Document & {
  comment: string;
  reviewer: Schema.Types.ObjectId;
  book: Schema.Types.ObjectId;
};

export type IReviewMethods = object;

export type ReviewModel = Model<IReview, object, IReviewMethods>;
