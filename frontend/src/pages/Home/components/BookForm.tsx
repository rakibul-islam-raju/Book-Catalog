/* eslint-disable @typescript-eslint/no-floating-promises */
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormEvent, useEffect, useState } from "react";
import {
	IBookPostData,
	useAddBookMutation,
	useUpdateBookMutation,
} from "../../../redux/apis/bookApi";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { GENRES } from "../../../utils/constants";
import { toast } from "react-toastify";
import ErrorDisplay from "../../../components/ErrorDisplay";

const initialState: {
	title: string;
	genre: string;
	publishYear: string;
} = {
	title: "",
	genre: "",
	publishYear: "",
};

type IProps = {
	title: string;
	open: boolean;
	book?: IBook;
	handleClose: () => void;
};

export default function BookForm({ title, open, book, handleClose }: IProps) {
	const [addBook, { isLoading, isSuccess, error }] = useAddBookMutation();
	const [
		updateBook,
		{ isLoading: editLoading, isSuccess: editSuccess, error: editError },
	] = useUpdateBookMutation();
	const [bookData, setBookData] = useState<IBookPostData>(book ?? initialState);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (book) {
			updateBook({ id: book.id, data: bookData });
		} else {
			addBook(bookData);
		}
	};

	const handleChangeDate = (newValue: string) => {
		const year = new Date(newValue).getFullYear();
		setBookData({ ...bookData, publishYear: String(year) });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Book added successfully.");
			handleClose();
		}
		if (editSuccess) {
			toast.success("Book updated successfully.");
			handleClose();
		}
	}, [isSuccess, editSuccess, handleClose]);

	return (
		<div>
			<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<Box
						component={"form"}
						onSubmit={handleSubmit}
						display={"flex"}
						flexDirection={"column"}
						gap={2}
					>
						<TextField
							autoFocus
							required
							margin="dense"
							id="title"
							label="Title"
							type="text"
							fullWidth
							variant="outlined"
							value={bookData.title}
							onChange={(e) =>
								setBookData({ ...bookData, title: e.target.value })
							}
						/>
						<FormControl fullWidth required>
							<InputLabel id="demo-simple-select-label">Genre</InputLabel>
							<Select
								label="Genre"
								name="genre"
								value={bookData.genre}
								onChange={(e) =>
									setBookData({ ...bookData, genre: e.target.value })
								}
								sx={{ minWidth: "200px" }}
							>
								{GENRES.map((genre: string) => (
									<MenuItem key={genre} value={genre}>
										{genre}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl fullWidth required>
							<DatePicker
								label="Publication Year"
								views={["year"]}
								value={dayjs(
									bookData.publishYear
										? new Date(bookData.publishYear)
										: new Date()
								)}
								onChange={(newValue) => handleChangeDate(String(newValue))}
							/>
						</FormControl>
						<Button
							type="submit"
							variant="contained"
							disabled={isLoading || editLoading}
						>
							Submit
						</Button>

						{(error || editError) && (
							<ErrorDisplay error={error || editError} />
						)}
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
}
