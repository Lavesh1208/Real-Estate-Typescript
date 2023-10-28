import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import {
   GetListingsInput,
   GetUserInput,
   UpdateUserInput,
} from '../schemas/user.schema';
import ErrorHandler from '../utils/ErrorHandler';
import { omit, update } from 'lodash';
import Listing from '../models/listing.model';

export const updateUser = async (
   req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
   res: Response,
   next: NextFunction,
) => {
   if (req.user.userId !== req.params.id) {
      return next(new ErrorHandler('You can update only your account', 401));
   }

   if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
   }

   const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
         $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
         },
      },
      { new: true },
   );

   if (!updatedUser) {
      return next(new ErrorHandler('Error updating', 404));
   }

   res.status(200).send(omit(updatedUser.toJSON(), 'password'));
};

export const deleteUser = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   if (req.user.userId !== req.params.id) {
      return next(new ErrorHandler('You can delete only your account', 401));
   }

   await User.findByIdAndDelete(req.params.id);
   res.clearCookie('access_token');
   res.send('User deleted');
};

export const getUserListings = async (
   req: Request<GetListingsInput['params'], {}, {}>,
   res: Response,
   next: NextFunction,
) => {
   if (req.user.userId !== req.params.id) {
      return next(new ErrorHandler('Unauthorized', 401));
   }
   const listings = await Listing.find({ userRef: req.params.id });
   res.status(200).send(listings);
};

export const getUser = async (
   req: Request<GetUserInput['params'], {}, {}>,
   res: Response,
   next: NextFunction,
) => {
   const user = await User.findById(req.params.id);
   if (!user) {
      return next(new ErrorHandler('User not found', 404));
   }

   res.status(200).send(omit(user.toJSON(), 'password'));
};
