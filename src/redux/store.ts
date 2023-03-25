import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api";
import authReducer from "./slice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});
