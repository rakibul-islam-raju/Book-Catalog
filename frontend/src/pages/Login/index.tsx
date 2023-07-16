import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ILoginPostData, useLoginMutation } from "../../redux/apis/authApi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ErrorDisplay from "../../components/ErrorDisplay";
import { toast } from "react-toastify";

const initialState: { email: string; password: string } = {
	email: "",
	password: "",
};

export default function Login() {
	const navigate = useNavigate();
	const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

	const [loginData, setLoginData] = useState<ILoginPostData>(initialState);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await login(loginData);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Welcome to Bookies");
			navigate("/");
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
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={loginData.email}
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
						value={loginData.password}
						onChange={handleChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={isLoading}
					>
						Sign In
					</Button>
					<Box>
						<Link to="/create-account">{"Don't have an account? Sign Up"}</Link>
					</Box>

					{isError && error && <ErrorDisplay error={error} />}
				</Box>
			</Box>
		</>
	);
}
