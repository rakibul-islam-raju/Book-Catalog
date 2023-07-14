import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { router } from "./routes";

function App() {
	return (
		<>
			<CssBaseline />
			<RouterProvider router={router}></RouterProvider>
		</>
	);
}

export default App;
