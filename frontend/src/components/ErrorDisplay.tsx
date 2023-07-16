/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Alert, AlertTitle } from "@mui/material";
import React from "react";

interface IErrorDisplayProps {
	error: any;
}

const ErrorDisplay: React.FC<IErrorDisplayProps> = ({ error }) => {
	return (
		<Alert severity="error">
			<AlertTitle>An error has occurred</AlertTitle>
			<div>
				{error?.data?.message ? error?.data?.message : JSON.stringify(error)}
			</div>
		</Alert>
	);
};

export default ErrorDisplay;
