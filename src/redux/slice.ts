import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLoggedin: false,
	},
	reducers: {
		login: (state: any) => {
			state.isLoggedin = true;
		},
		logout: (state: any) => {
			state.isLoggedin = false;
		},
	},
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
