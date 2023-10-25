import { NextFunction, Request, Response } from 'express';
import Listing from '../models/listing.model';
import { CreateListingInput } from '../schemas/listing.schema';

export const createListing = async (
   req: Request<{}, {}, CreateListingInput['body']>,
   res: Response,
   next: NextFunction,
) => {
   const listing = await Listing.create(req.body);
   res.status(201).send(listing);
};
