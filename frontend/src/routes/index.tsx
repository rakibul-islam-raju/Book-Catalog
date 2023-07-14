import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Login from "../pages/Login";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../pages/Home";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
		],
	},
	{
		path: "/",
		element: <AuthLayout />,
		children: [
			{
				path: "login",
				element: <Login />,
			},
		],
	},
]);
