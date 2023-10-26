import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { CustomeErrorType } from '../@types/errorTypes';
import { useSignOutMutation } from '../store/api/authApi';
import {
   deleteUserFailure,
   deleteUserSuccess,
   signOutUserFailure,
   signOutUserSuccess,
} from '../store/reducers/userReducer';

const SignoutUser = () => {
   const [signOut] = useSignOutMutation();
   const dispatch = useDispatch();

   const handleSignOut = async () => {
      try {
         await signOut();
         toast.success('User Signed Out Successfully!');
         dispatch(signOutUserSuccess());
         dispatch(deleteUserSuccess());
      } catch (error) {
         const errorMessage = (error as CustomeErrorType).data?.message;
         toast.error(errorMessage);
         dispatch(signOutUserFailure(errorMessage));
         dispatch(deleteUserFailure(errorMessage));
         console.log(error);
      }
   };

   return (
      <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
         Sign out
      </span>
   );
};

export default SignoutUser;
