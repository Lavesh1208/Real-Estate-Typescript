import axios from 'axios';
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CustomeErrorType } from '../@types/errorTypes';
import { IListing } from '../@types/listingType';
import DeleteUser from '../components/DeleteUser';
import SignoutUser from '../components/SignoutUser';
import UserListings from '../components/UserListings';
import { app } from '../firebase';
import { useUpdateUserMutation } from '../store/api/userApi';
import { updateUserSuccess } from '../store/reducers/userReducer';
import { RootState } from '../store/store';
import InputField from './InputField';

const Profile = () => {
   const [updateUser, { data, isSuccess, error }] = useUpdateUserMutation();

   const [file, setFile] = useState<File | null>();
   const [filePerc, setFilePerc] = useState(0);
   const [fileUploadError, setFileUploadError] = useState(false);
   const [showListingsError, setShowListingsError] = useState(false);
   const [userListings, setUserListings] = useState<IListing[]>([]);

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

   const handleShowListings = async () => {
      try {
         setShowListingsError(false);
         const res = await axios.get(
            `http://localhost:8000/api/user/listings/${currentUser._id}`,
            { withCredentials: true },
         );
         const data: IListing[] = res.data;
         setUserListings(data);
      } catch (error) {
         setShowListingsError(true);
         console.log(showListingsError);
      }
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
               src={!imgUrl ? currentUser?.avatar : imgUrl}
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
            <Link
               className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
               to={'/create-listing'}
            >
               Create Listing
            </Link>
         </form>
         <div className="flex justify-between mt-5">
            <DeleteUser />
            <SignoutUser />
         </div>
         <button onClick={handleShowListings} className="text-green-700 w-full">
            Show Listings
         </button>
         {userListings && userListings.length > 0 && (
            <UserListings userListings={userListings} />
         )}
      </div>
   );
};

export default Profile;
