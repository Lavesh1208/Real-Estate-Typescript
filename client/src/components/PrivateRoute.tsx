import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

const PrivateRoute = () => {
	const currentUser = useSelector((state: RootState) => state.user.userInfo);
	return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
