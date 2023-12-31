import { TypeOf, object, string } from 'zod';

export const signupSchema = object({
   body: object({
      username: string({
         required_error: 'Username is required',
      }),
      email: string({
         required_error: 'email is required',
      }).email('Not a valid Email'),
      password: string({
         required_error: 'Password is required',
      }).min(6, 'Password must be at least 6 characters'),
      avatar: string().optional(),
   }),
});

export const loginSchema = object({
   body: object({
      email: string({
         required_error: 'Email is required',
      }).email(),
      password: string({
         required_error: 'Password is required',
      }),
   }),
});

export const googleSigninSchema = object({
   body: object({
      username: string({
         required_error: 'Username is required',
      }),
      email: string({
         required_error: 'email is required',
      }).email('Not a valid Email'),
      avatar: string(),
   }),
});

export type SignupUserInput = TypeOf<typeof signupSchema>;

export type LoginUserInput = TypeOf<typeof loginSchema>;

export type GoogleSigninInput = TypeOf<typeof googleSigninSchema>;
