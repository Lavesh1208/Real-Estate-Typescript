import toast from 'react-hot-toast';
import { IListing } from '../@types/listingType';
import { useDeleteListingMutation } from '../store/api/listingApi';
import { Link, useNavigate } from 'react-router-dom';

interface UserListingsProps {
   userListings: IListing[];
}

const UserListings: React.FC<UserListingsProps> = ({ userListings }) => {
   const [deleteListing] = useDeleteListingMutation();
   const navigate = useNavigate();

   const handleListingDelete = async (id: string) => {
      try {
         await deleteListing(id);
         toast.success('Listing Deleted Successfully');
      } catch (error) {
         console.log(error);
         toast.error('Listing could not be deleted');
      }
   };

   return (
      <>
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

                     <button
                        onClick={() =>
                           navigate(`/update-listing/${listing._id}`, {
                              state: {
                                 listing,
                              },
                           })
                        }
                        className="text-green-700 uppercase"
                     >
                        Edit
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};

export default UserListings;
