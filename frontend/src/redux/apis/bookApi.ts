/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { baseApi } from "./baseApi";

export interface IBookParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: string;
	title?: string;
	genre?: string;
	searchTerm?: string;
	publishYear?: string;
}

export interface IBookPostData {
	title: string;
	genre: string;
	publishYear: string;
}
export interface IBookUpdateData {
	id: string;
	data: Partial<IBookPostData>;
}

export const bookApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getBooks: builder.query<IResponse<IBook[]>, IBookParams>({
			query: (params) => ({
				url: `/books`,
				params,
			}),
			providesTags: ["Books"],
		}),
		getBook: builder.query<IResponse<IBook>, string>({
			query: (id) => ({
				url: `/books/${id}`,
			}),
			providesTags: (result, error, arg) => [{ type: "Books", id: arg }],
		}),
		addBook: builder.mutation<string, IBookPostData>({
			query: (data: IBookPostData) => ({
				url: `books`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["Books"],
		}),
		updateBook: builder.mutation<string, IBookUpdateData>({
			query: ({ id, data }: IBookUpdateData) => ({
				url: `books/${id}`,
				method: "PATCH",
				body: data,
			}),
			invalidatesTags: (result, error, arg) => [{ type: "Books", id: arg.id }],
		}),
		deleteBook: builder.mutation<string, string>({
			query: (id) => ({
				url: `books/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Books"],
		}),
	}),
});

export const {
	useGetBooksQuery,
	useGetBookQuery,
	useAddBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
} = bookApi;
