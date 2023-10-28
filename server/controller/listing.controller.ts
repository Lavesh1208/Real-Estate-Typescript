import { NextFunction, Request, Response } from 'express';
import Listing from '../models/listing.model';
import {
   CreateListingInput,
   DeleteListingInput,
   GetListingInput,
   UpdateListingInput,
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

export const updateListing = async (
   req: Request<UpdateListingInput['params'], {}, UpdateListingInput['body']>,
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

   const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
   );

   res.status(200).send(updatedListing);
};

export const getListing = async (
   req: Request<GetListingInput['params'], {}, {}>,
   res: Response,
   next: NextFunction,
) => {
   const listings = await Listing.findById(req.params.id);
   if (!listings) {
      return next(new ErrorHandler('Listing not found', 404));
   }

   res.status(200).send(listings);
};

export const getListings = async (
   req: Request<{}, {}, {}>,
   res: Response,
   next: NextFunction,
) => {
   const limit = Number(req.query.limit) || 9;
   const startIndex = Number(req.query.startIndex) || 0;

   let offer = req.query.offer;
   if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
   }

   let furnished = req.query.furnished;
   if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
   }

   let parking = req.query.parking;
   if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
   }

   let type = req.query.type;
   if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
   }

   const searchTem = req.query.searchTem || '';

   const sort = req.query.sort || 'createdAt';

   const order = req.query.order || 'desc';
   const listings = await Listing.find({
      name: { $regex: searchTem, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
   })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

   res.status(200).send(listings);
};
