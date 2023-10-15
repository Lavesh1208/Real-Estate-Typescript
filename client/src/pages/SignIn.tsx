import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { CustomeErrorType } from '../@types/errorTypes';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useSigninUserMutation } from '../store/api/userApi';
import { useDispatch } from 'react-redux';
import { signInFailure, signInSuccess } from '../store/reducers/userReducer';
import OAuth from '../components/OAuth';

const SignIn = () => {
   const [signinUser, { data, isLoading, isSuccess, error }] =
      useSigninUserMutation();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         email: '',
         password: '',
      },
      mode: 'onChange',
   });

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
      await signinUser(data);
   };

   useEffect(() => {
      if (error) {
         const errorMessage = (error as CustomeErrorType).data?.message;
         dispatch(signInFailure(errorMessage));
         toast.error(errorMessage);
         console.log(error);
      } else if (isSuccess && data) {
         console.log(data);
         dispatch(signInSuccess(data));
         toast.success('Welcome Back!');
         navigate('/');
      }
   }, [error, isSuccess, data, navigate, dispatch]);
   return (
      <div className="p-3 max-w-lg mx-auto">
         <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
         >
            <InputField
               id="email"
               inputType="email"
               placeHolderText="Email"
               register={register}
               errors={errors}
            />

            <InputField
               id="password"
               inputType="password"
               placeHolderText="Password"
               register={register}
               errors={errors}
            />

            <button
               type="submit"
               disabled={isLoading}
               className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
               {isLoading ? 'Loading...' : 'Sign In'}
            </button>
            <OAuth />
         </form>
         <div className="flex gap-2 mt-5">
            <p>Dont have an account?</p>
            <Link to={'/sign-up'}>
               <span className="text-blue-700">Sign in</span>
            </Link>
         </div>
      </div>
   );
};

export default SignIn;
