/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import Loader from "../../components/Loader";
import ErrorDisplay from "../../components/ErrorDisplay";
import { useEffect, useState } from "react";
import BookForm from "../Home/components/BookForm";
import { useLocation } from "react-router-dom";
import {
	useAddReviewMutation,
	useGetReviewsQuery,
} from "../../redux/apis/reviewAPi";
import { toast } from "react-toastify";

export default function Book() {
	const { state } = useLocation();
	const book: IBook = state.book as IBook;

	const [open, setOpen] = useState<boolean>(false);
	const [comment, setComment] = useState<string>("");

	const {
		data: reviews,
		isLoading,
		isError,
		error,
	} = useGetReviewsQuery({ bookId: book.id }, { skip: !book.id });

	const [
		addReview,
		{ isLoading: createLoading, error: CreateError, isSuccess },
	] = useAddReviewMutation();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		if (!book.id || comment.length === 0) {
			return false;
		}
		addReview({ comment, book: book.id });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Review added successfully!");
			setComment("");
		}
	}, [isSuccess]);

	return (
		<Box>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				alignItems={"start"}
				mb={2}
			>
				<Box>
					{isError && error && <ErrorDisplay error={error} />}

					<Typography variant="h4" gutterBottom>
						{book.title}
					</Typography>
					<Typography>
						Author:
						<span
							style={{ marginLeft: "3px" }}
						>{`${book.author.firstName} ${book.author.lastName}`}</span>
					</Typography>
					<Typography>
						Genre: <span style={{ marginLeft: "3px" }}>{`${book.genre}`}</span>
					</Typography>
					<Typography>
						Publish year:{" "}
						<span style={{ marginLeft: "3px" }}>{`${book.publishYear}`}</span>
					</Typography>
				</Box>
				<ButtonGroup>
					<Button variant="outlined" color="info" onClick={handleClickOpen}>
						Edit
					</Button>
					<Button variant="outlined" color="error" onClick={handleClickOpen}>
						Delete
					</Button>
				</ButtonGroup>
			</Box>

			<Box mt={4} width={{ xs: 12 / 12, md: 6 / 12 }}>
				<Divider sx={{ mb: 4 }} />
				<Typography variant="h5" gutterBottom>
					Reviews
				</Typography>

				<TextField
					multiline
					name="comment"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					rows={3}
					fullWidth
					required
				/>
				<Box display={"flex"} justifyContent={"flex-end"} mt={1}>
					<Button
						variant="contained"
						disabled={createLoading}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				</Box>

				{CreateError && <ErrorDisplay error={CreateError} />}

				<Box mt={4}>
					<List
						sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
					>
						{isLoading ? (
							<Loader />
						) : isError && error ? (
							<ErrorDisplay error={error} />
						) : (
							reviews?.data &&
							reviews?.data.length > 0 &&
							reviews.data.map((review: IReview) => (
								<Box key={review.id}>
									<ListItem alignItems="flex-start">
										<ListItemAvatar>
											<Avatar
												alt={review.reviewer.firstName}
												src="/static/images/avatar/1.jpg"
											/>
										</ListItemAvatar>
										<ListItemText
											primary={review.comment}
											secondary={
												<>{`- ${review.reviewer.firstName} ${
													review.reviewer.lastName
												} - ${new Date(review.createdAt).toLocaleString()}`}</>
											}
										/>
									</ListItem>
									<Divider variant="inset" component="li" />
								</Box>
							))
						)}
					</List>
				</Box>
			</Box>

			{open && (
				<BookForm open={open} handleClose={handleClose} title={"Edit Book"} />
			)}
		</Box>
	);
}
