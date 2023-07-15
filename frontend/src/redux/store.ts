import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./apis/baseApi";
import AuthSliceReducer from "./slices/authSlice";

const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	auth: AuthSliceReducer,
});

const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
