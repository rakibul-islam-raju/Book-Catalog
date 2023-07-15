/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IAuthState = {
	access: string | null;
	user?: IUser | null;
};

type ITokens = {
	access: string;
};

const authDataString = localStorage.getItem("bookiesAuth");

let access: string | null = null;

if (authDataString) {
	const authData: ITokens = JSON.parse(authDataString);
	access = authData.access;
}

const initialState: IAuthState = {
	access: access ?? null,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoggedIn(state, action: PayloadAction<{ access: string }>) {
			state.access = action.payload.access;
			localStorage.setItem(
				"bookiesAuth",
				JSON.stringify(action.payload.access)
			);
		},
		userLoggedOut(state) {
			state.access = null;
			state.user = null;

			localStorage.removeItem("bookiesAuth");
		},
		setUserInfo(state, action: PayloadAction<IUser>) {
			state.user = action.payload;
		},
	},
});

export const { userLoggedIn, userLoggedOut, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
