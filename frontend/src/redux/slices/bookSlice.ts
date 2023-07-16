/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RESULTS_PER_PAGE } from "../../utils";

type Params = {
	params: {
		page?: number;
		limit?: number;
		sortBy?: string;
		sortOrder?: string;
		title?: string;
		genre?: string;
		searchTerm?: string;
		pushlishYear?: string;
	};
};

const initialState: Params = {
	params: {
		limit: RESULTS_PER_PAGE,
		page: 1,
	},
};

const bookSlice = createSlice({
	name: "book",
	initialState,
	reducers: {
		setLimit(state, action: PayloadAction<number>) {
			state.params.limit = action.payload;
		},
		setPage(state, action: PayloadAction<number>) {
			state.params.page = action.payload;
		},
		setGenre(state, action: PayloadAction<string>) {
			if (action.payload === "all") {
				delete state.params.genre;
			} else {
				state.params.genre = action.payload;
			}
		},
		setSearchTerm(state, action: PayloadAction<string>) {
			if (action.payload === "") {
				delete state.params.searchTerm;
			} else {
				state.params.searchTerm = action.payload;
			}
		},
		setPushlishYear(state, action: PayloadAction<string>) {
			state.params.pushlishYear = action.payload;
		},
		clearAllFilters(state) {
			state.params = { limit: RESULTS_PER_PAGE, page: 1 };
		},
	},
});

export const {
	setLimit,
	setPage,
	setGenre,
	setSearchTerm,
	setPushlishYear,
	clearAllFilters,
} = bookSlice.actions;
export default bookSlice.reducer;
