import {
	Alert,
	AlertTitle,
	Box,
	Chip,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useGetBooksQuery } from "../../redux/apis/bookApi";
import Loader from "../../components/Loader";
import ErrorDisplay from "../../components/ErrorDisplay";
import { DatePicker } from "@mui/x-date-pickers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	setGenre,
	setPushlishYear,
	setSearchTerm,
} from "../../redux/slices/bookSlice";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

const GENRES = [
	"fiction",
	"novel",
	"narrative",
	"science-fiction",
	"non-fiction",
	"thriller",
	"mystry",
	"autobiography",
	"biography",
	"history",
	"self-help",
];

export default function Home() {
	const dispatch = useAppDispatch();
	const { params } = useAppSelector((state) => state.book);

	const [searchText, setsearchText] = useState<string>(params.searchTerm ?? "");
	const debouncedSearchTerm = useDebounce(searchText, 500);

	const { data, isLoading, isError, error } = useGetBooksQuery({
		...params,
	});

	const handleChangeDate = (newValue: string) => {
		const year = new Date(newValue).getFullYear();
		dispatch(setPushlishYear(String(year)));
	};

	useEffect(() => {
		dispatch(setSearchTerm(debouncedSearchTerm));
	}, [debouncedSearchTerm, dispatch]);

	return (
		<Box>
			<Box>
				<Typography variant="h4" gutterBottom>
					All Books
				</Typography>
			</Box>
			<Stack
				direction={"row"}
				gap={1}
				alignItems={"center"}
				justifyContent={"flex-end"}
			>
				<FormControl>
					<InputLabel id="demo-simple-select-label">Genre</InputLabel>
					<Select
						label="Genre"
						value={params.genre}
						onChange={(e) => dispatch(setGenre(String(e.target.value)))}
						sx={{ minWidth: "200px" }}
					>
						<MenuItem value={"all"}>All</MenuItem>
						{GENRES.map((genre: string) => (
							<MenuItem key={genre} value={genre}>
								{genre}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<DatePicker
					label="Publication Year"
					views={["year"]}
					onChange={(newValue) => handleChangeDate(String(newValue))}
				/>
			</Stack>
			<Box mt={2}>
				<TextField
					fullWidth
					label="Search by book name or genre"
					value={searchText}
					onChange={(e) => setsearchText(e.target.value)}
				/>
			</Box>
			<Box mt={4}>
				{isLoading ? (
					<Loader />
				) : isError && error ? (
					<ErrorDisplay error={error} />
				) : data?.data && data?.data?.length > 0 ? (
					<Grid container spacing={2}>
						{data.data.map((book: IBook) => (
							<Grid item key={book.id} xs={12} md={3}>
								<Paper sx={{ p: 2 }}>
									<Typography variant="h6">{book.title}</Typography>
									<Box
										display={"flex"}
										justifyContent={"space-between"}
										alignItems={"center"}
									>
										<Typography variant="body2" color={"grey"}>
											<strong>Author:</strong>{" "}
											{`${book.author.firstName} ${book.author.lastName}`}
										</Typography>
										<Chip
											color="primary"
											label={book.genre}
											variant="outlined"
											sx={{ textTransform: "uppercase" }}
										/>
									</Box>
								</Paper>
							</Grid>
						))}
					</Grid>
				) : (
					<Alert severity="warning">
						<AlertTitle>No books found</AlertTitle>
					</Alert>
				)}
			</Box>
		</Box>
	);
}
