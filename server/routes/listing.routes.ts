import express from 'express';
import validateResource from '../middlewares/validateResource';
import { catchAsync } from '../middlewares/catchAsync';
import { verifyToken } from '../utils/verifyUser';
import {
   createListing,
   deleteListing,
   getListing,
   updateListing,
} from '../controller/listing.controller';
import {
   createlistingSchema,
   deleteListingSchema,
   getListingSchema,
   updateListingSchema,
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

router.put(
   '/update/:id',
   [verifyToken, validateResource(updateListingSchema)],
   catchAsync(updateListing),
);

router.get(
   '/get/:id',
   [validateResource(getListingSchema)],
   catchAsync(getListing),
);

export default router;
