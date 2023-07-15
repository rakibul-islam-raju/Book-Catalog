/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setUserInfo, userLoggedIn } from "../redux/slices/authSlice";
import { IDecodedType } from "../redux/apis/authApi";

export default function useAuthCheck() {
	const dispatch = useAppDispatch();

	const [authChecked, setAuthChecked] = useState<boolean>(false);

	useEffect(() => {
		const localAuth = localStorage.getItem("bookiesAuth");

		if (localAuth) {
			const auth: string = JSON.parse(localAuth);
			const decodedtoken: IDecodedType = jwt_decode(auth);

			if (auth) {
				dispatch(
					userLoggedIn({
						access: auth,
					})
				);

				dispatch(setUserInfo(decodedtoken.user));
			}
		}

		setAuthChecked(true);
	}, [dispatch, setAuthChecked]);

	return authChecked;
}
