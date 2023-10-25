import express from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import listingRouter from './listing.routes';

const router = express.Router();

router.use('/api/auth', authRouter);
router.use('/api/user', userRouter);

router.use('/api/listing', listingRouter);

export default router;
