import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useGoogleSigninMutation } from '../store/api/authApi';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { signInFailure, signInSuccess } from '../store/reducers/userReducer';
import { CustomeErrorType } from '../@types/errorTypes';
import { useNavigate } from 'react-router-dom';
import { IGoogleSignin } from '../@types/userTypes';

const OAuth = () => {
   const [googleSignin, { data, isLoading, isSuccess, error }] =
      useGoogleSigninMutation();

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleGoogleClick = async () => {
      try {
         const provider = new GoogleAuthProvider();
         const auth = getAuth(app);

         const result = await signInWithPopup(auth, provider);

         const data = {
            username: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL,
         } as IGoogleSignin;

         googleSignin(data);
      } catch (error) {
         console.log('could not sign in with google', error);
      }
   };

   useEffect(() => {
      if (error) {
         const errorMessage = (error as CustomeErrorType).data?.message;
         dispatch(signInFailure(errorMessage));
         toast.error(errorMessage);
         console.log(error);
      } else if (isSuccess && data) {
         dispatch(signInSuccess(data));
         toast.success('Welcome!');
         navigate('/');
      }
   }, [error, isSuccess, data, navigate, dispatch]);

   return (
      <button
         disabled={isLoading}
         onClick={handleGoogleClick}
         type="button"
         className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
      >
         Continue with google
      </button>
   );
};

export default OAuth;
