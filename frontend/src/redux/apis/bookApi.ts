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
	id: number;
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
			invalidatesTags: ["Books"],
		}),
		deleteBook: builder.mutation({
			query: (id: string) => ({
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
