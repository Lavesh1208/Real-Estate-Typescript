import { Request, Response, NextFunction, RequestHandler } from 'express';
import ErrorHandler from '../utils/ErrorHandler';

interface CustomError extends Error {
   statusCode?: number;
   path?: string;
   errors?: any;
   code?: number;
   keyValue?: any;
}

export const catchAsync = <T extends Request, U>(
   fn: (req: T, res: Response, next: NextFunction) => Promise<U>,
): RequestHandler => {
   return (req: Request, res: Response, next: NextFunction) => {
      fn(req as T, res, next).catch((err: CustomError) => {
         err.statusCode = err.statusCode || 500;
         err.message = err.message || 'Internal Server Error';

         // Wrong Mongo ID Error (CastError)
         if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            err = new ErrorHandler(message, 400);
         }

         // Handling Mongoose Validation Error (ValidationError)
         if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(
               (val: any) => val.message,
            );
            const message = messages.join(', ');
            err = new ErrorHandler(message, 400);
         }

         // Handling Mongoose Duplicate Key Error (MongoError)
         if (err.name === 'MongoError' && err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
            err = new ErrorHandler(message, 400);
         }

         // Handling Wrong JWT Error (JsonWebTokenError)
         if (err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid. Try Again!!!';
            err = new ErrorHandler(message, 400);
         }

         // Handling Expired JWT Error (TokenExpiredError)
         if (err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired. Try Again!!!';
            err = new ErrorHandler(message, 400);
         }

         // Pass the error to the next middleware (Express error handler)
         next(err);
      });
   };
};
