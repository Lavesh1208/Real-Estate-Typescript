import express from 'express';
import validateResource from '../middlewares/validateResource';
import {
   googleSigninSchema,
   loginUserSchema,
   signupUserSchema,
} from '../schemas/auth.schema';
import { googleSignin, signin, signup } from '../controller/auth.controller';

const router = express.Router();

router.post('/signup', validateResource(signupUserSchema), signup);

router.post('/signin', validateResource(loginUserSchema), signin);

router.post('/google', validateResource(googleSigninSchema), googleSignin);

export default router;
