export interface IListing {
   _id: string;
   name: string;
   description: string;
   address: string;
   type: 'rent' | 'sale';
   price: number;
   numOfGuests: number;
   numOfBeds: number;
   numOfBaths: number;
   regularPrice: number;
   discountPrice: number;
   offer: boolean;
   parking: boolean;
   furnished: boolean;
   images: string[];
   createdAt: Date;
   updatedAt: Date;
}
