import { Link } from 'react-router-dom';
import InputField from './InputField';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';

const SignUp = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         username: '',
         email: '',
         password: '',
      },
      mode: 'onChange',
   });

   const onSubmit: SubmitHandler<FieldValues> = async () => {};

   return (
      <div className="p-3 max-w-lg mx-auto">
         <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
         >
            <InputField
               id="username"
               inputType="text"
               placeHolderText="Username"
               register={register}
               errors={errors}
            />

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
               className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
               Sign Up
            </button>
         </form>
         <div className="flex gap-2 mt-5">
            <p>Have an account?</p>
            <Link to={'/sign-in'}>
               <span className="text-blue-700">Sign in</span>
            </Link>
         </div>
      </div>
   );
};

export default SignUp;
