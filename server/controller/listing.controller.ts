import { NextFunction, Request, Response } from 'express';
import Listing from '../models/listing.model';

export const createListing = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   const listing = await Listing.create(req.body);
   res.status(201).send(listing);
};
