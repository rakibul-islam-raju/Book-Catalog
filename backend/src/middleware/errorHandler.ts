/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { errorLogger } from '../utils/logger';
import { IGenericErrorMessage } from '../utils/errors/errors.interfaces';
import { ErrorHandler } from '../utils/errors/errors.handlers';
import { ApiError } from '../utils/errors/errors.clsses';

export const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next
) => {
  config.env === 'development'
    ? console.log('Global error handler => ', err)
    : errorLogger.error(`Global error handler => ${JSON.stringify(err)}`);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplifiedError = ErrorHandler.handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = ErrorHandler.handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = ErrorHandler.handleSimplifiedError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof Error) {
    message = err.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};
