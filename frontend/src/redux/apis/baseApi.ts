import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../utils";

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_API_URL,
	// prepareHeaders: async (headers, { getState }) => {
	// 	const token: string = (getState() as RootState).auth.access;
	// 	if (token) {
	// 		headers.set("Authorization", `Bearer ${token}`);
	// 	}
	// 	return headers;
	// },
});

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: baseQuery,
	tagTypes: ["Users"],
	endpoints: () => ({}),
});
