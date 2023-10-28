import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";
import { IListing } from "../../@types/listingType";

export const listingApi = createApi({
	reducerPath: "listingApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000/api/listing/",
		credentials: "include",
	}),
	tagTypes: ["Listings", "Listing"],
	endpoints: (builder) => ({
		getListing: builder.query<IListing, string>({
			query: (id) => ({
				url: `/get/${id}`,
				method: "GET",
			}),
			providesTags: ["Listing"],
		}),
		filterListing: builder.query<IListing[], string>({
			query: (searchQuery) => ({
				url: `/get?${searchQuery}`,
				method: "GET",
			}),
			providesTags: ["Listings"],
		}),
		createListing: builder.mutation<IListing, FieldValues>({
			query: (body) => ({
				url: "/create",
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["Listings"],
		}),
		deleteListing: builder.mutation<IListing, string>({
			query: (id) => ({
				url: `/delete/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Listings"],
		}),
		updateListing: builder.mutation<IListing, FieldValues>({
			query: ({ id, body }) => ({
				url: `/update/${id}`,
				method: "PUT",
				body: body,
			}),
			invalidatesTags: ["Listings"],
		}),
	}),
});

export const {
	useGetListingQuery,
	useFilterListingQuery,
	useCreateListingMutation,
	useDeleteListingMutation,
	useUpdateListingMutation,
} = listingApi;
