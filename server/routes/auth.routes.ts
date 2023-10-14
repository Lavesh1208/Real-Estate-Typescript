import express from 'express';
import validateResource from '../middlewares/validateResource';
import { signupUserSchema } from '../schemas/auth.schema';
import { signup } from '../controller/auth.controller';

const router = express.Router();

router.post('/signup', validateResource(signupUserSchema), signup);

export default router;
