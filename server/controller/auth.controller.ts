import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import { omit } from 'lodash';
import {
   GoogleSigninInput,
   LoginUserInput,
   SignupUserInput,
} from '../schemas/auth.schema';
import bcryptjs from 'bcryptjs';

export const signup = async (
   req: Request<{}, {}, SignupUserInput['body']>,
   res: Response,
   next: NextFunction,
) => {
   const { username, email, password } = req.body;
   const userExist = await User.findOne({ email });

   if (userExist) {
      return next(new ErrorHandler('User already exists', 400));
   }
   const hashedPassword = bcryptjs.hashSync(password, 10);
   const user = new User({ username, email, password: hashedPassword });
   await user.save();

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

export const googleSignin = async (
   req: Request<{}, {}, GoogleSigninInput['body']>,
   res: Response,
   next: NextFunction,
) => {
   const user = await User.findOne({ email: req.body.email });

   if (user) {
      const token = user.getJWTToken();

      res.cookie('access_token', token, {
         httpOnly: true,
         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      res.status(200).send(omit(user.toJSON(), 'password'));
   } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const username =
         req.body.username.split(' ').join('').toLowerCase() +
         Math.random().toString(36).slice(-4);
      const newUser = new User({
         username: username,
         email: req.body.email,
         password: generatedPassword,
         avatar: req.body.avatar,
      });

      await newUser.save();

      const token = newUser.getJWTToken();

      res.cookie('access_token', token, {
         httpOnly: true,
         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      res.status(200).send(omit(newUser.toJSON(), 'password'));
   }
};

export const signOut = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   res.clearCookie('access_token');
   res.send({ message: 'User signed out' });
};
