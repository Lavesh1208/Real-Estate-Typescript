import { IUser } from './userTypes';

export interface IListing {
   _id: string;
   name: string;
   description: string;
   address: string;
   type: 'rent' | 'sale';
   price: number;
   bathrooms: number;
   bedrooms: number;
   regularPrice: number;
   discountPrice: number;
   offer: boolean;
   parking: boolean;
   furnished: boolean;
   imageUrls: string[];
   userRef: IUser;
   createdAt: Date;
   updatedAt: Date;
}
