import express from 'express';
import validateResource from '../middlewares/validateResource';
import {
   googleSigninSchema,
   loginSchema,
   signupSchema,
} from '../schemas/auth.schema';
import {
   googleSignin,
   signOut,
   signin,
   signup,
} from '../controller/auth.controller';
import { catchAsync } from '../middlewares/catchAsync';

const router = express.Router();

router.post('/signup', validateResource(signupSchema), catchAsync(signup));

router.post('/signin', validateResource(loginSchema), catchAsync(signin));

router.post(
   '/google',
   validateResource(googleSigninSchema),
   catchAsync(googleSignin),
);

router.post('/signout', catchAsync(signOut));

export default router;
