import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { reviewService } from './review.service';
import { sendResponse } from '../../utils/sendResponse';
import { pickQueryParams } from '../../utils/pagination/pickQueryParams';
import { paginationOptions } from '../../utils/pagination/pagination.constant';

const createReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const reviewData = req.body;
    const requestedUser = req.user;
    const userId = requestedUser?.id;

    const newReview = await reviewService.createNewReview(reviewData, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review created successfully',
      data: newReview,
    });
  }
);

const updateReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id: reviewId } = req.params;
    const data = req.body;
    const requestedUser = req.user;
    const userId = requestedUser?.id;

    const updatedReview = await reviewService.updateReview(
      data,
      reviewId,
      userId
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review updated successfully',
      data: updatedReview,
    });
  }
);

const getReviews: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const paginationParams = pickQueryParams(req.query, paginationOptions);

    const reviews = await reviewService.getAllReview(bookId, paginationParams);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Reviews retrieved successfully',
      meta: reviews?.meta,
      data: reviews.data,
    });
  }
);

const getSingleReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const review = await reviewService.getReview(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review retrieved successfully',
      data: review,
    });
  }
);

const deleteReview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id: reviewId } = req.params;
    const requestedUser = req.user;
    const userId = requestedUser?.id;

    const deletedReview = await reviewService.deleteReview(reviewId, userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Review deleted successfully',
      data: deletedReview,
    });
  }
);

export const reviewController = {
  createReview,
  updateReview,
  getReviews,
  getSingleReview,
  deleteReview,
};
