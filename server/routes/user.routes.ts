import express from 'express';
import validateResource from '../middlewares/validateResource';
import { getListingsSchema, updateUserSchema } from '../schemas/user.schema';
import { getUserListings, updateUser } from '../controller/user.controller';
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

export default router;
