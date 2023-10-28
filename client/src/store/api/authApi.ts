import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FieldValues } from "react-hook-form";
import { IGoogleSignin, IUser } from "../../@types/userTypes";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:8000/api/auth/",
		credentials: "include",
	}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		signupUser: builder.mutation<IUser, FieldValues>({
			query: (user) => ({
				url: "/signup",
				method: "POST",
				body: user,
			}),
			invalidatesTags: ["User"],
		}),
		signinUser: builder.mutation<IUser, FieldValues>({
			query: (user) => ({
				url: "/signin",
				method: "POST",
				body: user,
			}),
			invalidatesTags: ["User"],
		}),
		googleSignin: builder.mutation<IUser, IGoogleSignin>({
			query: (user) => ({
				url: "/google",
				method: "POST",
				body: user,
			}),
			invalidatesTags: ["User"],
		}),
		signOut: builder.mutation<void, void>({
			query: () => ({
				url: "/signout",
				method: "POST",
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useSignupUserMutation,
	useSigninUserMutation,
	useGoogleSigninMutation,
	useSignOutMutation,
} = authApi;
