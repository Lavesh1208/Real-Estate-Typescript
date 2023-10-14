import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import { omit } from 'lodash';
import { LoginUserInput, SignupUserInput } from '../schemas/auth.schema';

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

export const signin = async (
   req: Request<{}, {}, LoginUserInput['body']>,
   res: Response,
   next: NextFunction,
) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (!user) {
      return next(new ErrorHandler('Invalid email or password', 400));
   }

   const isPasswordMatch = await user.comparePassword(password);

   if (!isPasswordMatch) {
      return next(new ErrorHandler('Invalid email or password', 400));
   }

   const token = user.getJWTToken();

   res.cookie('access_token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
   });

   res.status(200).send(omit(user.toJSON(), 'password'));
};
