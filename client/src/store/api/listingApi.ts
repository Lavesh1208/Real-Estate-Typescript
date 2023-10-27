import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FieldValues } from 'react-hook-form';
import { IListing } from '../../@types/listingType';

export const listingApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/api/listing/',
      credentials: 'include',
   }),
   tagTypes: ['Listings', 'Listing'],
   endpoints: (builder) => ({
      getListing: builder.query<IListing, string>({
         query: (id) => ({
            url: `/get/${id}`,
            method: 'GET',
         }),
         providesTags: ['Listing'],
      }),
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
      updateListing: builder.mutation<IListing, FieldValues>({
         query: ({ id, body }) => ({
            url: `/update/${id}`,
            method: 'PUT',
            body: body,
         }),
         invalidatesTags: ['Listings'],
      }),
   }),
});

export const {
   useGetListingQuery,
   useCreateListingMutation,
   useDeleteListingMutation,
   useUpdateListingMutation,
} = listingApi;
