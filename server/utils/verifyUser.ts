import { NextFunction, Request, Response } from 'express';
import ErrorHandler from './ErrorHandler';
import jwt from 'jsonwebtoken';

export const verifyToken = (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   const token = req.cookies.access_token;
   if (!token)
      return next(
         new ErrorHandler('Please login to access this resource', 401),
      );

   jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
         if (err)
            return next(
               new ErrorHandler('Please login to access this resource', 401),
            );

         req.user = user;
         next();
      },
   );
};
