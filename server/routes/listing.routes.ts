import express from 'express';
import validateResource from '../middlewares/validateResource';
import { catchAsync } from '../middlewares/catchAsync';
import { verifyToken } from '../utils/verifyUser';
import { createListing } from '../controller/listing.controller';
import { createlistingSchema } from '../schemas/listing.schema';

const router = express.Router();

router.post(
   '/create',
   [verifyToken, validateResource(createlistingSchema)],
   catchAsync(createListing),
);

export default router;
