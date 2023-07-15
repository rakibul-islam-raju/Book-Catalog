import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoginImage from "../assets/svg/login.svg";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { useLayoutEffect } from "react";

export default function AuthLayout() {
	const navigate = useNavigate();
	const { user } = useAppSelector((state) => state.auth);

	console.log(user);

	useLayoutEffect(() => {
		if (user) {
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	return (
		<>
			<Navbar />
			<Container maxWidth={"xl"}>
				<Box
					height={"90vh"}
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Grid container>
						<Grid
							item
							xs={false}
							sm={4}
							md={7}
							sx={{
								backgroundImage: `url(${LoginImage})`,
								backgroundRepeat: "no-repeat",
								backgroundColor: (t) =>
									t.palette.mode === "light"
										? t.palette.grey[50]
										: t.palette.grey[900],
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}
						/>
						<Grid
							item
							xs={12}
							sm={8}
							md={5}
							component={Paper}
							elevation={0}
							square
						>
							<Outlet />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}
