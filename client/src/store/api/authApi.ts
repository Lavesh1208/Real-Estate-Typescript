import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FieldValues } from 'react-hook-form';
import { IGoogleSignin, IUser } from '../../@types/userTypes';

export const authApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/auth',
      credentials: 'include',
   }),
   tagTypes: ['AuthUser'],
   endpoints: (builder) => ({
      signupUser: builder.mutation<IUser, FieldValues>({
         query: (user) => ({
            url: '/signup',
            method: 'POST',
            body: user,
         }),
         invalidatesTags: ['AuthUser'],
      }),
      signinUser: builder.mutation<IUser, FieldValues>({
         query: (user) => ({
            url: '/signin',
            method: 'POST',
            body: user,
         }),
         invalidatesTags: ['AuthUser'],
      }),
      googleSignin: builder.mutation<IUser, IGoogleSignin>({
         query: (user) => ({
            url: '/google',
            method: 'POST',
            body: user,
         }),
         invalidatesTags: ['AuthUser'],
      }),
   }),
});

export const {
   useSignupUserMutation,
   useSigninUserMutation,
   useGoogleSigninMutation,
} = authApi;
