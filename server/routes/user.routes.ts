import express from 'express';
import validateResource from '../middlewares/validateResource';
import {
   getListingsSchema,
   getUserSchema,
   updateUserSchema,
} from '../schemas/user.schema';
import {
   getUser,
   getUserListings,
   updateUser,
} from '../controller/user.controller';
import { verifyToken } from '../utils/verifyUser';
import { catchAsync } from '../middlewares/catchAsync';

const router = express.Router();

router.post(
   '/update/:id',
   [verifyToken, validateResource(updateUserSchema)],
   catchAsync(updateUser),
);

router.delete('/delete/:id', verifyToken, catchAsync(updateUser));

router.get(
   '/listings/:id',
   [verifyToken, validateResource(getListingsSchema)],
   catchAsync(getUserListings),
);

router.get(
   '/:id',
   [verifyToken, validateResource(getUserSchema)],
   catchAsync(getUser),
);

export default router;
