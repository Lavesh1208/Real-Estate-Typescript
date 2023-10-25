import mongoose, { Schema } from 'mongoose';

export interface ListingDocument extends mongoose.Document {
   name: string;
   description: string;
   address: string;
   regularPrice: number;
   discountPrice: number;
   bathrooms: number;
   bedrooms: number;
   furnished: boolean;
   parking: boolean;
   type: string;
   offer: boolean;
   imageUrls: string[];
   userRef: String;
   createdAt: Date;
   updatedAt: Date;
}

const listingSchema = new Schema<ListingDocument>(
   {
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      address: {
         type: String,
         required: true,
      },
      regularPrice: {
         type: Number,
         required: true,
      },
      discountPrice: {
         type: Number,
         required: true,
      },
      bathrooms: {
         type: Number,
         required: true,
      },
      bedrooms: {
         type: Number,
         required: true,
      },
      furnished: {
         type: Boolean,
         required: true,
      },
      parking: {
         type: Boolean,
         required: true,
      },
      type: {
         type: String,
         required: true,
      },
      offer: {
         type: Boolean,
         required: true,
      },
      imageUrls: {
         type: [String],
         required: true,
      },
      userRef: {
         type: String,
         ref: 'User',
      },
   },
   {
      timestamps: true,
   },
);

const Listing = mongoose.model<ListingDocument>('Listing', listingSchema);

export default Listing;
