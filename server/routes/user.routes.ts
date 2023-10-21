import express from 'express';
import validateResource from '../middlewares/validateResource';
import { updateUserSchema } from '../schemas/user.schema';
import { updateUser } from '../controller/user.controller';
import { verifyToken } from '../utils/verifyUser';
import { catchAsync } from '../middlewares/catchAsync';

const router = express.Router();

router.post(
   '/update/:id',
   [verifyToken, validateResource(updateUserSchema)],
   catchAsync(updateUser),
);

router.delete('/delete/:id', verifyToken, catchAsync(updateUser));

export default router;
