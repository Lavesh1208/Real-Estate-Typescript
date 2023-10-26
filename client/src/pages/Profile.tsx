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
import { app } from '../firebase';
import { useSignOutMutation } from '../store/api/authApi';
import {
   useDeleteUserMutation,
   useUpdateUserMutation,
} from '../store/api/userApi';
import {
   deleteUserFailure,
   deleteUserSuccess,
   signOutUserFailure,
   signOutUserSuccess,
   updateUserSuccess,
} from '../store/reducers/userReducer';
import { RootState } from '../store/store';
import InputField from './InputField';
import axios from 'axios';
import { IListing } from '../@types/listingType';
import { useDeleteListingMutation } from '../store/api/listingApi';

const Profile = () => {
   const [updateUser, { data, isSuccess, error }] = useUpdateUserMutation();
   const [deleteUser, { isSuccess: isDeleteSuccess, error: errorDelete }] =
      useDeleteUserMutation();
   const [signOut, { isSuccess: isSignOutSuccess, error: errorSignOut }] =
      useSignOutMutation();
   const [deleteListing] = useDeleteListingMutation();

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

   const handleDeleteUser = async () => {
      await deleteUser(currentUser?._id);
   };

   const handleSignOut = async () => {
      await signOut();
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

   const handleListingDelete = async (id: string) => {
      try {
         await deleteListing(id);
         toast.success('Listing Deleted Successfully');
      } catch (error) {
         console.log(error);
         toast.error('Listing could not be deleted');
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

   useEffect(() => {
      if (errorDelete) {
         const errorMessage = (errorDelete as CustomeErrorType).data?.message;
         toast.error(errorMessage);
         console.log(errorDelete);
         dispatch(deleteUserFailure(errorMessage));
      } else if (isDeleteSuccess) {
         toast.success('User Deleted Successfully!');
         dispatch(deleteUserSuccess());
      }
   }, [errorDelete, isDeleteSuccess, dispatch]);

   useEffect(() => {
      if (errorSignOut) {
         const errorMessage = (errorSignOut as CustomeErrorType).data?.message;
         toast.error(errorMessage);
         dispatch(signOutUserFailure(errorMessage));
         dispatch(deleteUserFailure(errorMessage));
         console.log(errorSignOut);
      } else if (isSignOutSuccess) {
         toast.success('User Signed Out Successfully!');
         dispatch(signOutUserSuccess());
         dispatch(deleteUserSuccess());
      }
   }, [errorSignOut, isSignOutSuccess, dispatch]);

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
            <Link
               className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
               to={'/create-listing'}
            >
               Create Listing
            </Link>
         </form>
         <div className="flex justify-between mt-5">
            <span
               className="text-red-700 cursor-pointer"
               onClick={handleDeleteUser}
            >
               Delete account
            </span>
            <span
               onClick={handleSignOut}
               className="text-red-700 cursor-pointer"
            >
               Sign out
            </span>
         </div>
         <button onClick={handleShowListings} className="text-green-700 w-full">
            Show Listings
         </button>
         {userListings && userListings.length > 0 && (
            <div className="flex flex-col gap-4">
               <h1 className="text-center mt-7 text-2xl font-semibold">
                  Your Listings
               </h1>
               {userListings.map((listing) => (
                  <div
                     key={listing._id}
                     className="border rounded-lg p-3 flex justify-between items-center gap-4"
                  >
                     <Link to={`/listing/${listing._id}`}>
                        <img
                           src={listing.imageUrls[0]}
                           alt="listing cover"
                           className="h-16 w-16 object-contain"
                        />
                     </Link>
                     <Link
                        className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                        to={`/listing/${listing._id}`}
                     >
                        <p>{listing.name}</p>
                     </Link>

                     <div className="flex flex-col item-center">
                        <button
                           onClick={() => handleListingDelete(listing._id)}
                           className="text-red-700 uppercase"
                        >
                           Delete
                        </button>
                        <Link to={`/update-listing/${listing._id}`}>
                           <button className="text-green-700 uppercase">
                              Edit
                           </button>
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Profile;
