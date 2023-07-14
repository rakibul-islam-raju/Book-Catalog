import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import { errorHandler } from './middleware/errorHandler';
import router from './routes';

const app: Application = express();

// configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//entry point
app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World');
});

//routes
app.use('/api/v1', router);

// middlewares
app.use(errorHandler);

// not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: `${req.originalUrl} not found`,
    errorMessages: [
      {
        path: req.originalUrl,
        message: `${req.originalUrl} not found`,
      },
    ],
  });
});

export default app;
