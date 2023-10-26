import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FieldValues } from 'react-hook-form';
import { IListing } from '../../@types/listingType';

export const listingApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/api/listing/',
      credentials: 'include',
   }),
   tagTypes: ['Listings'],
   endpoints: (builder) => ({
      createListing: builder.mutation<IListing, FieldValues>({
         query: (body) => ({
            url: '/create',
            method: 'POST',
            body: body,
         }),
         invalidatesTags: ['Listings'],
      }),
      deleteListing: builder.mutation<IListing, string>({
         query: (id) => ({
            url: `/delete/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Listings'],
      }),
   }),
});

export const { useCreateListingMutation, useDeleteListingMutation } =
   listingApi;
