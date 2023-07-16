import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { userLoggedOut } from "../redux/slices/authSlice";

export default function Navbar() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { user } = useAppSelector((state) => state.auth);

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component={Link}
						to="/"
						sx={{
							mr: 2,
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Bookies
					</Typography>

					<Box sx={{ flexGrow: 0 }}>
						{!user ? (
							<Button
								sx={{ color: "#fff" }}
								variant="text"
								onClick={() => navigate("/login")}
							>
								Login <LoginIcon sx={{ ml: 2 }} />
							</Button>
						) : (
							<Button
								sx={{ color: "#fff" }}
								variant="text"
								onClick={() => dispatch(userLoggedOut())}
							>
								Logout <LogoutIcon sx={{ ml: 1 }} />
							</Button>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
