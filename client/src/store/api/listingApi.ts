import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";
import { IListing } from "../../@types/listingType";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/listing/`;

export const listingApi = createApi({
	reducerPath: "listingApi",
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
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
		getOfferListings: builder.query<IListing[], void>({
			query: () => ({
				url: `/get?offer=true&limit=4`,
				method: "GET",
			}),
			providesTags: ["Listings"],
		}),
		getRentListings: builder.query<IListing[], void>({
			query: () => ({
				url: `/get?type=rent&limit=4`,
				method: "GET",
			}),
			providesTags: ["Listings"],
		}),
		getSaleListings: builder.query<IListing[], void>({
			query: () => ({
				url: `/get?type=sale&limit=4`,
				method: "GET",
			}),
			providesTags: ["Listings"],
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
	useGetOfferListingsQuery,
	useGetRentListingsQuery,
	useGetSaleListingsQuery,
	useFilterListingQuery,
	useCreateListingMutation,
	useDeleteListingMutation,
	useUpdateListingMutation,
} = listingApi;
