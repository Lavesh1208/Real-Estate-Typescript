import { NextFunction, Request, Response } from 'express';
import Listing from '../models/listing.model';
import {
   CreateListingInput,
   DeleteListingInput,
} from '../schemas/listing.schema';
import ErrorHandler from '../utils/ErrorHandler';

export const createListing = async (
   req: Request<{}, {}, CreateListingInput['body']>,
   res: Response,
   next: NextFunction,
) => {
   const listing = await Listing.create(req.body);
   res.status(201).send(listing);
};

export const deleteListing = async (
   req: Request<DeleteListingInput['params'], {}, {}>,
   res: Response,
   next: NextFunction,
) => {
   const listing = await Listing.findById(req.params.id);

   if (!listing) {
      return next(new ErrorHandler('Listing not found', 404));
   }

   if (listing.userRef !== req.user.userId) {
      return next(new ErrorHandler('Unauthorized', 401));
   }

   await Listing.findByIdAndDelete(req.params.id);
   res.status(200).send({ message: 'Listing deleted' });
};
