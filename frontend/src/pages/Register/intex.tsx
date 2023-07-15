import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
	ICreateUserPostData,
	useSignupMutation,
} from "../../redux/apis/authApi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ErrorDisplay from "../../components/ErrorDisplay";
import { toast } from "react-toastify";

const initialState: {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
} = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
};

export default function Register() {
	const navigate = useNavigate();
	const [signup, { isLoading, isError, error, isSuccess }] =
		useSignupMutation();

	const [signupData, setSignupData] =
		useState<ICreateUserPostData>(initialState);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await signup(signupData);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSignupData({ ...signupData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Account Created");
			navigate("/login");
		}
	}, [isSuccess, navigate]);

	return (
		<>
			<Box
				sx={{
					my: 8,
					mx: 4,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Create New Account
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="firstName"
						label="First Name"
						name="firstName"
						autoComplete="first name"
						value={signupData.firstName}
						onChange={handleChange}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="lastName"
						label="Last Name"
						name="lastName"
						autoComplete="last name"
						value={signupData.lastName}
						onChange={handleChange}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						value={signupData.email}
						onChange={handleChange}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={signupData.password}
						onChange={handleChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={isLoading}
					>
						Register
					</Button>
					<Box>
						<Link to="/login">{"Already have an account? Login"}</Link>
					</Box>

					{isError && error && <ErrorDisplay error={error} />}
				</Box>
			</Box>
		</>
	);
}
