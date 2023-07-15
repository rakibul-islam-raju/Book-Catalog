/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import jwt_decode from "jwt-decode";
import { baseApi } from "./baseApi";
import { setUserInfo, userLoggedIn } from "../slices/authSlice";

export type ILoginPostData = {
	email: string;
	password: string;
};

export type ILoginResponseData = {
	access: string;
};

export type IDecodedType = {
	token_type: string;
	exp: Date | number;
	iat: Date | number;
	jti: string;
	user_id: number;
	user: IUser;
};

export type ICreateUserPostData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data: ILoginPostData) => ({
				url: "/auth/login",
				method: "POST",
				body: data,
			}),
			async onQueryStarted(_, { queryFulfilled, dispatch }) {
				try {
					const { data }: { data: IResponse<ILoginResponseData> } =
						await queryFulfilled;

					if (data?.data.access) {
						const decodedtoken: IDecodedType = jwt_decode(data.data.access);

						dispatch(
							userLoggedIn({
								access: data.data.access,
							})
						);

						dispatch(setUserInfo(decodedtoken.user));
					}
				} catch (err) {
					// do nothing
				}
			},
		}),
		signup: builder.mutation<string, ICreateUserPostData>({
			query: (data: ICreateUserPostData) => ({
				url: `/users`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Users"],
		}),
	}),
});

export const { useLoginMutation, useSignupMutation } = authApi;
