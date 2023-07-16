import { baseApi } from "./baseApi";

export interface IReviewParams {
	page?: number;
	limit?: number;
	bookId: string;
}

export interface IReviewPostData {
	comment: string;
	book: string;
}

export interface IReviewUpdateData {
	id: number;
	data: IReviewPostData;
}

export const reviewApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getReviews: builder.query<IResponse<IReview[]>, IReviewParams>({
			query: (params) => ({
				url: `/reviews/${params.bookId}`,
				params,
			}),
			providesTags: ["Reviews"],
		}),
		getReview: builder.query<IResponse<IReview>, string>({
			query: (id) => ({
				url: `/reviews/${id}`,
			}),
		}),
		addReview: builder.mutation<string, IReviewPostData>({
			query: (data: IReviewPostData) => ({
				url: `reviews`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Reviews"],
		}),
		updateReview: builder.mutation<string, IReviewUpdateData>({
			query: ({ id, data }: IReviewUpdateData) => ({
				url: `reviews/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: ["Reviews"],
		}),
		deleteReview: builder.mutation({
			query: (id: string) => ({
				url: `reviews/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Reviews"],
		}),
	}),
});

export const {
	useGetReviewQuery,
	useGetReviewsQuery,
	useAddReviewMutation,
	useUpdateReviewMutation,
	useDeleteReviewMutation,
} = reviewApi;
