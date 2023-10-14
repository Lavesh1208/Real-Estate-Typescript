import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import { omit } from 'lodash';
import { SignupUserInput } from '../schemas/auth.schema';

export const signup = async (
   req: Request<{}, {}, SignupUserInput['body']>,
   res: Response,
   next: NextFunction,
) => {
   const userExist = await User.findOne({ email: req.body.email });

   if (userExist) {
      return next(new ErrorHandler('User already exists', 400));
   }

   const user = await User.create(req.body);

   res.status(201).send(omit(user.toJSON(), 'password'));
};
