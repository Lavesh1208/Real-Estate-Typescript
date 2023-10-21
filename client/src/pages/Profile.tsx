import InputField from './InputField';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useRef, useState } from 'react';
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
   useDeleteUserMutation,
   useUpdateUserMutation,
} from '../store/api/userApi';
import toast from 'react-hot-toast';
import { CustomeErrorType } from '../@types/errorTypes';
import {
   deleteUserSuccess,
   updateUserSuccess,
} from '../store/reducers/userReducer';

const Profile = () => {
   const [updateUser, { data, isSuccess, error }] = useUpdateUserMutation();
   const [deleteUser, { isSuccess: isDeleteSuccess, error: errorDelete }] =
      useDeleteUserMutation();

   const [file, setFile] = useState<File | null>();
   const [filePerc, setFilePerc] = useState(0);
   const [fileUploadError, setFileUploadError] = useState(false);

   const { currentUser } = useSelector((state: RootState) => state.user);
   const [imgUrl, setImgUrl] = useState(currentUser.avatar as string);

   const dispatch = useDispatch();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         username: currentUser?.username,
         email: currentUser?.email,
         password: '',
      },
      mode: 'onChange',
   });

   const fileRef = useRef<HTMLInputElement>(null);

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      const user =
         data.password.length > 0
            ? { ...data, _id: currentUser?._id, avatar: imgUrl }
            : {
                 username: data.username,
                 email: data.email,
                 _id: currentUser?._id,
                 avatar: imgUrl,
              };
      await updateUser(user);
   };

   const handleFileUpload = (file: File) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         'state_changed',
         (snapshot) => {
            const progress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
         },
         (error) => {
            setFileUploadError(true);
            console.log(error);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
               setImgUrl(downloadURL),
            );
         },
      );
   };

   const handleDeleteUser = async () => {
      await deleteUser(currentUser?._id);
   };

   useEffect(() => {
      if (file) {
         handleFileUpload(file);
      }
   }, [file]);

   useEffect(() => {
      if (error) {
         const errorMessage = (error as CustomeErrorType).data?.message;
         toast.error(errorMessage);
         console.log(error);
      } else if (isSuccess && data) {
         toast.success('User Updated Successfully!');
         dispatch(updateUserSuccess(data));
      }
   }, [error, isSuccess, data, dispatch]);

   useEffect(() => {
      if (errorDelete) {
         const errorMessage = (errorDelete as CustomeErrorType).data?.message;
         toast.error(errorMessage);
         console.log(errorDelete);
      } else if (isDeleteSuccess) {
         toast.success('User Deleted Successfully!');
         dispatch(deleteUserSuccess());
      }
   }, [errorDelete, isDeleteSuccess, dispatch]);
   return (
      <div className="p3 max-w-lg mx-auto">
         <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
         >
            <input
               onChange={(e) => setFile(e.target.files?.[0])}
               type="file"
               ref={fileRef}
               hidden
               accept="image/*"
            />
            <img
               onClick={() => fileRef.current?.click()}
               src={imgUrl.length > 0 ? imgUrl : currentUser?.avatar}
               alt="User Prolife"
               className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            />
            <p className="text-sm self-center">
               {fileUploadError ? (
                  <span className="text-red-700">Error uploading image</span>
               ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
               ) : filePerc === 100 ? (
                  <span className="text-green-700">
                     Image successfully uploaded!
                  </span>
               ) : (
                  ''
               )}
            </p>
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
            <span
               className="text-red-700 cursor-pointer"
               onClick={handleDeleteUser}
            >
               Delete account
            </span>
            <span className="text-red-700 cursor-pointer">Sign out</span>
         </div>
      </div>
   );
};

export default Profile;
