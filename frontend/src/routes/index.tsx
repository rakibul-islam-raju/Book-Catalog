import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout";
import Login from "../pages/Login";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../pages/Home";
import Register from "../pages/Register/intex";
import Book from "../pages/Book";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "book/:id",
				element: <Book />,
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
			{
				path: "create-account",
				element: <Register />,
			},
		],
	},
]);
