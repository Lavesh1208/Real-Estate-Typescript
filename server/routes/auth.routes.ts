import express from 'express';
import validateResource from '../middlewares/validateResource';
import { loginUserSchema, signupUserSchema } from '../schemas/auth.schema';
import { signin, signup } from '../controller/auth.controller';

const router = express.Router();

router.post('/signup', validateResource(signupUserSchema), signup);

router.post('/signin', validateResource(loginUserSchema), signin);

export default router;
