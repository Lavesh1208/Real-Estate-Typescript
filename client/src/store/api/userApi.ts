import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUpdateUser, IUser } from '../../@types/userTypes';

export const userApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/user',
      credentials: 'include',
   }),
   tagTypes: ['User'],
   endpoints: (builder) => ({
      updateUser: builder.mutation<IUser, IUpdateUser>({
         query: (user) => ({
            url: `/update/${user._id}`,
            method: 'POST',
            body: user,
         }),
         invalidatesTags: ['User'],
      }),
   }),
});

export const { useUpdateUserMutation } = userApi;
