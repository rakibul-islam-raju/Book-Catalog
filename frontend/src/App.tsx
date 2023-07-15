import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { router } from "./routes";
import { ToastContainer } from "react-toastify";
import useAuthCheck from "./hooks/useAuthCheck";
import Loader from "./components/Loader";

function App() {
	const authChecked = useAuthCheck();

	return (
		<>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			<CssBaseline />
			{!authChecked ? (
				<Loader />
			) : (
				<RouterProvider router={router} fallbackElement={<Loader />} />
			)}
		</>
	);
}

export default App;
