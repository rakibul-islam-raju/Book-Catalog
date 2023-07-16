import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

const reviewSchema = new Schema<IReview, ReviewModel>(
  {
    comment: {
      type: String,
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
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

const Review = model<IReview, ReviewModel>('Review', reviewSchema);

export default Review;
