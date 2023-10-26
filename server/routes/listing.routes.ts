import express from 'express';
import validateResource from '../middlewares/validateResource';
import { catchAsync } from '../middlewares/catchAsync';
import { verifyToken } from '../utils/verifyUser';
import { createListing, deleteListing } from '../controller/listing.controller';
import {
   createlistingSchema,
   deleteListingSchema,
} from '../schemas/listing.schema';

const router = express.Router();

router.post(
   '/create',
   [verifyToken, validateResource(createlistingSchema)],
   catchAsync(createListing),
);

router.delete(
   '/delete/:id',
   [verifyToken, validateResource(deleteListingSchema)],
   catchAsync(deleteListing),
);

export default router;
