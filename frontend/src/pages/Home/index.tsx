import {
	Alert,
	AlertTitle,
	Badge,
	Box,
	Chip,
	Grid,
	Paper,
	Typography,
} from "@mui/material";
import { useGetBooksQuery } from "../../redux/apis/bookApi";
import Loader from "../../components/Loader";
import ErrorDisplay from "../../components/ErrorDisplay";

export default function Home() {
	const { data, isLoading, isError, error } = useGetBooksQuery({ limit: 20 });

	return (
		<Box>
			<Typography variant="h4" gutterBottom>
				All Books
			</Typography>
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
