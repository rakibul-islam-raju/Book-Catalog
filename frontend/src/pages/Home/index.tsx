import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Chip,
	Divider,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
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
import BookForm from "./components/BookForm";
import { GENRES } from "../../utils/constants";

export default function Home() {
	const dispatch = useAppDispatch();
	const { params } = useAppSelector((state) => state.book);

	const [open, setOpen] = useState<boolean>(false);
	const [editBook, setEditBook] = useState<IBook | null>(null);
	const [searchText, setsearchText] = useState<string>(params.searchTerm ?? "");
	const debouncedSearchTerm = useDebounce(searchText, 500);

	const { data, isLoading, isError, error } = useGetBooksQuery({
		...params,
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeDate = (newValue: string) => {
		const year = new Date(newValue).getFullYear();
		dispatch(setPushlishYear(String(year)));
	};

	useEffect(() => {
		dispatch(setSearchTerm(debouncedSearchTerm));
	}, [debouncedSearchTerm, dispatch]);

	return (
		<Box>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				alignItems={"center"}
				mb={2}
			>
				<Typography variant="h4" gutterBottom>
					All Books
				</Typography>
				<Button variant="outlined" onClick={handleClickOpen}>
					New Book
				</Button>
			</Box>
			<Grid container spacing={2} mb={4}>
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label="Search by book name or genre"
						value={searchText}
						onChange={(e) => setsearchText(e.target.value)}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<Box display={"flex"} gap={1}>
						<FormControl fullWidth>
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
						<FormControl fullWidth>
							<DatePicker
								label="Publication Year"
								views={["year"]}
								onChange={(newValue) => handleChangeDate(String(newValue))}
							/>
						</FormControl>
					</Box>
				</Grid>
			</Grid>

			<Divider />

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

			{open && (
				<BookForm open={open} handleClose={handleClose} title={"New Book"} />
			)}
			{editBook && (
				<BookForm
					open={!!editBook}
					handleClose={handleClose}
					title={"Edit Book"}
				/>
			)}
		</Box>
	);
}
