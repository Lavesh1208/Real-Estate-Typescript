import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUpdateUser, IUser } from "../../@types/userTypes";
import { IListing } from "../../@types/listingType";

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/user/`;

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: baseUrl,
		credentials: "include",
	}),
	tagTypes: ["User", "UserListings"],
	endpoints: (builder) => ({
		getUserListings: builder.query<IListing[], string>({
			query: (id) => ({
				url: `/listings/${id}`,
				method: "GET",
			}),
			providesTags: ["UserListings"],
		}),
		updateUser: builder.mutation<IUser, IUpdateUser>({
			query: (user) => ({
				url: `/update/${user._id}`,
				method: "POST",
				body: user,
			}),
			invalidatesTags: ["User"],
		}),
		deleteUser: builder.mutation<string, string>({
			query: (id) => ({
				url: `/delete/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["User"],
		}),
		getUser: builder.query<IUser, string>({
			query: (id) => ({
				url: `/${id}`,
				method: "GET",
			}),
			providesTags: ["User"],
		}),
	}),
});

export const {
	useUpdateUserMutation,
	useDeleteUserMutation,
	useGetUserListingsQuery,
	useGetUserQuery,
} = userApi;
