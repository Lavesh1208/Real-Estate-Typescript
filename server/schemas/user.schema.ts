import { TypeOf, object, string } from 'zod';

const payload = {
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
};

const params = {
   params: object({
      id: string({
         required_error: 'User ID is required',
      }),
   }),
};

export const updateUserSchema = object({
   ...payload,
});

export const getListingsSchema = object({
   ...params,
});

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;

export type GetListingsInput = TypeOf<typeof getListingsSchema>;
