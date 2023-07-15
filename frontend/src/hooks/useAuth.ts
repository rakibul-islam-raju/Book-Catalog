import { useAppSelector } from "../redux/hooks";

export default function useAuth() {
	const auth = useAppSelector((state) => state.auth);

	if (auth?.access) return true;

	return false;
}
