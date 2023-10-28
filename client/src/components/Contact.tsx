import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IListing } from '../@types/listingType';
import { IUser } from '../@types/userTypes';

interface ContactProps {
   listing: IListing;
}

const Contact: React.FC<ContactProps> = ({ listing }) => {
   const [landlord, setLandlord] = useState<IUser | null>(null);
   const [message, setMessage] = useState('');

   const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
   };

   useEffect(() => {
      const fetchLandlord = async () => {
         try {
            const res = await axios.get(
               `http://localhost:8000/api/user/${listing.userRef}`,
               { withCredentials: true },
            );
            const data: IUser = res.data;
            setLandlord(data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchLandlord();
   }, [listing.userRef]);

   return (
      <>
         <h1>Contact</h1>
         {landlord && (
            <div className="flex flex-col gap-2">
               <p>
                  Contact{' '}
                  <span className="font-semibold">{landlord.username}</span> for{' '}
                  <span className="font-semibold">
                     {listing.name.toLowerCase()}
                  </span>
               </p>
               <textarea
                  name="message"
                  id="message"
                  rows={2}
                  value={message}
                  onChange={onChange}
                  placeholder="Enter your message here..."
                  className="w-full border p-3 rounded-lg"
               ></textarea>

               <Link
                  to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                  className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
               >
                  Send Message
               </Link>
            </div>
         )}
      </>
   );
};

export default Contact;
