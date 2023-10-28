import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { CustomeErrorType } from "../@types/errorTypes";
import { useDeleteUserMutation } from "../store/api/userApi";
import { RootState } from "../store/store";
import { userActions } from "../store/reducers/userReducer";

const DeleteUser = () => {
	const currentUser = useSelector((state: RootState) => state.user.userInfo);

	const [deleteUser] = useDeleteUserMutation();

	const dispatch = useDispatch();

	const handleDeleteUser = async () => {
		try {
			await deleteUser(currentUser?._id ?? "");
			toast.success("User Deleted Successfully!");
			dispatch(userActions.resetUserInfo());
		} catch (error) {
			const errorMessage = (error as CustomeErrorType).data?.message;
			toast.error(errorMessage);
			console.log(error);
		}
	};

	return (
		<span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>
			Delete account
		</span>
	);
};

export default DeleteUser;
