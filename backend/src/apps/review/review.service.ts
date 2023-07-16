import httpStatus from 'http-status';
import { IReview } from './review.interface';
import Review from './review.model';
import { ApiError } from '../../utils/errors/errors.clsses';
import { IPaginationOptions } from '../../utils/pagination/pagination.interface';
import { PaginationHelpers } from '../../helpers/paginationHelper';

const createNewReview = async (
  reviewData: IReview,
  userId: string
): Promise<IReview | null> => {
  const newReview = new Review({ ...reviewData, reviewer: userId });
  await newReview.save();
  return newReview.populate('reviewer');
};

const updateReview = async (
  reviewData: Partial<IReview>,
  id: string,
  userId: string
): Promise<IReview | null> => {
  const review = await Review.findOne({ _id: id });
  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found.');
  }

  if (String(review?.reviewer) !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
  }

  const updatedReview = await Review.findOneAndUpdate({ _id: id }, reviewData, {
    new: true,
  }).populate('reviewer');

  return updatedReview;
};

const getAllReview = async (
  bookId: string,
  paginationParams: IPaginationOptions
) => {
  const { page, limit, skip } =
    PaginationHelpers.generatePaginationAndSortFields(paginationParams);

  const review = await Review.find({ book: bookId })
    .populate('reviewer')
    .skip(skip)
    .limit(limit);

  const total = review?.length ?? 0;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: review,
  };
};

const getReview = async (id: string): Promise<IReview | null> => {
  const review = await Review.findById(id).populate('reviewer');
  return review;
};

const deleteReview = async (
  id: string,
  userId: string
): Promise<IReview | null> => {
  const review = await Review.findOne({ _id: id });

  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found.');
  }

  if (String(review?.reviewer) !== userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized.');
  }

  const deletedReview = await Review.findByIdAndDelete(id).populate('reviewer');
  return deletedReview;
};

export const reviewService = {
  createNewReview,
  updateReview,
  getAllReview,
  getReview,
  deleteReview,
};
