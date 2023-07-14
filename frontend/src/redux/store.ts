import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./apis/baseApi";
import AuthSliceReducer from "./slices/authSlice";
import { NODE_ENV } from "../utils";

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	auth: AuthSliceReducer,
});

const store = configureStore({
	reducer: rootReducer,
	devTools: NODE_ENV === "development",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
