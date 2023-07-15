import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootLayout() {
	return (
		<>
			<Navbar />
			<Container maxWidth="xl" sx={{ mt: 2 }}>
				<Outlet />
			</Container>
		</>
	);
}
export default RootLayout;
