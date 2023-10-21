import { TypeOf, object, string } from 'zod';

export const updateUserSchema = object({
   body: object({
      username: string({
         required_error: 'Username is required',
      }).optional(),
      email: string({
         required_error: 'email is required',
      })
         .email('Not a valid Email')
         .optional(),
      password: string({
         required_error: 'Password is required',
      })
         .min(6, 'Password must be at least 6 characters')
         .optional(),
      avatar: string().optional(),
   }),
   params: object({
      id: string(),
   }),
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
