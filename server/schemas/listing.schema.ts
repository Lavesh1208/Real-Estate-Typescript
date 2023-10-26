import { TypeOf, array, boolean, number, object, string } from 'zod';

const payload = {
   body: object({
      name: string({
         required_error: 'title is required',
      }),
      description: string({
         required_error: 'description is required',
      }),
      address: string({
         required_error: 'address is required',
      }),
      regularPrice: number({
         required_error: 'regularPrice is required',
      }),
      discountPrice: number({
         required_error: 'discountPrice is required',
      }),
      bathrooms: number({
         required_error: 'bathroom is required',
      }),
      bedrooms: number({
         required_error: 'bedroom is required',
      }),
      furnished: boolean({
         required_error: 'furnished is required',
      }),
      parking: boolean({
         required_error: 'parking is required',
      }),
      type: string({
         required_error: 'type is required',
      }),
      offer: boolean({
         required_error: 'offer is required',
      }),
      imageUrls: array(
         string({
            required_error: 'imageUrls is required',
         }),
      ),
      userRef: string({
         required_error: 'userRef is required',
      }),
   }),
};

const params = {
   params: object({
      id: string({
         required_error: 'listingId is required',
      }),
   }),
};

export const createlistingSchema = object({
   ...payload,
});

export const deleteListingSchema = object({
   ...params,
});

export type CreateListingInput = TypeOf<typeof createlistingSchema>;

export type DeleteListingInput = TypeOf<typeof deleteListingSchema>;
