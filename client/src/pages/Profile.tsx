import InputField from './InputField';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Profile = () => {
   const { currentUser } = useSelector((state: RootState) => state.user);
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
      <div className="p3 max-w-lg mx-auto">
         <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
         >
            <img
               src={currentUser?.avatar}
               alt="User Prolife"
               className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            />
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
            <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
               Update
            </button>
         </form>
         <div className="flex justify-between mt-5">
            <span className="text-red-700 cursor-pointer">Delete account</span>
            <span className="text-red-700 cursor-pointer">Sign out</span>
         </div>
      </div>
   );
};

export default Profile;
