import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./api/authApi";
import { listingApi } from "./api/listingApi";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducers/userReducer";

const userInfoFromStorage = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user")!)
	: null;

const initialState = {
	user: { userInfo: userInfoFromStorage },
};

const store = configureStore({
	reducer: {
		user: userReducer,
		[userApi.reducerPath]: userApi.reducer,
		[listingApi.reducerPath]: listingApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
	},
	preloadedState: initialState,
	middleware: (getDefault) =>
		getDefault().concat([
			userApi.middleware,
			listingApi.middleware,
			authApi.middleware,
		]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export default store;
