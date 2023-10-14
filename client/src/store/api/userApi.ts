import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FieldValues } from 'react-hook-form';
import { IUser } from '../../@types/userTypes';

export const userApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/auth',
      credentials: 'include',
   }),
   tagTypes: ['User'],
   endpoints: (builder) => ({
      signupUser: builder.mutation<IUser, FieldValues>({
         query: (user) => ({
            url: '/signup',
            method: 'POST',
            body: user,
         }),
         invalidatesTags: ['User'],
      }),
   }),
});

export const { useSignupUserMutation } = userApi;
