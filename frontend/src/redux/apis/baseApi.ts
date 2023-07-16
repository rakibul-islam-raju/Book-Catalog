/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../utils";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_API_URL,
	prepareHeaders: async (headers, { getState }) => {
		const token: string | null = (getState() as RootState).auth.access;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: baseQuery,
	tagTypes: ["Users", "Books", "Reviews"],
	endpoints: () => ({}),
});
