import InputCheckbox from '../components/InputCheckbox';
import InputField from './InputField';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

const CreateListing = () => {
   const {
      register,
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: '',
         description: '',
         address: '',
         type: 'rent',
         bedrooms: 1,
         bathrooms: 1,
         regularPrice: 50,
         discountPrice: 0,
         offer: false,
         parking: false,
         image: '',
         furnished: false,
      },
      mode: 'onChange',
   });

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      console.log(data);
   };

   return (
      <main className="p-3 max-w-4xl mx-auto">
         <h1 className="text-3xl font-semibold text-center my-7">
            Create a Listing
         </h1>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row gap-4"
         >
            <div className="flex flex-col gap-4 flex-1">
               <InputField
                  id="name"
                  inputType="text"
                  isTextArea
                  placeHolderText="Name"
                  register={register}
                  errors={errors}
               />
               <InputField
                  id="description"
                  inputType="text"
                  placeHolderText="Description"
                  register={register}
                  errors={errors}
               />
               <InputField
                  id="address"
                  inputType="text"
                  placeHolderText="Address"
                  register={register}
                  errors={errors}
               />
               <div className="flex gap-6 flex-wrap">
                  <div className="flex gap-2">
                     <InputCheckbox
                        id="sale"
                        inputType="checkbox"
                        register={register}
                        checked={control._defaultValues.type === 'sale'}
                     />
                     <span>Sell</span>
                  </div>
                  <div className="flex gap-2">
                     <InputCheckbox
                        inputType="checkbox"
                        id="rent"
                        register={register}
                        checked={control._defaultValues.type === 'rent'}
                     />
                     <span>Rent</span>
                  </div>
                  <div className="flex gap-2">
                     <InputCheckbox
                        inputType="checkbox"
                        id="parking"
                        register={register}
                        checked={control._defaultValues.parking}
                     />
                     <span>Parking spot</span>
                  </div>
                  <div className="flex gap-2">
                     <InputCheckbox
                        inputType="checkbox"
                        id="furnished"
                        register={register}
                        checked={control._defaultValues.furnished}
                     />
                     <span>Furnished</span>
                  </div>
                  <div className="flex gap-2">
                     <InputCheckbox
                        inputType="checkbox"
                        id="offer"
                        register={register}
                        checked={control._defaultValues.offer}
                     />
                     <span>Offer</span>
                  </div>
               </div>
               <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                     <InputField
                        inputType="number"
                        id="bedrooms"
                        min="1"
                        max="10"
                        register={register}
                     />
                     <p>Beds</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <InputField
                        inputType="number"
                        id="bathrooms"
                        min="1"
                        max="10"
                        register={register}
                     />
                     <p>Baths</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <InputField
                        inputType="number"
                        id="regularPrice"
                        min="50"
                        max="10000000"
                        register={register}
                     />
                     <div className="flex flex-col items-center">
                        <p>Regular price</p>
                        {control._defaultValues.type === 'rent' && (
                           <span className="text-xs">($ / month)</span>
                        )}
                     </div>
                  </div>
                  {control._defaultValues.offer && (
                     <div className="flex items-center gap-2">
                        <input
                           type="number"
                           id="discountPrice"
                           min="0"
                           max="10000000"
                        />
                        <div className="flex flex-col items-center">
                           <p>Discounted price</p>

                           {control._defaultValues.type === 'rent' && (
                              <span className="text-xs">($ / month)</span>
                           )}
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
               <p className="font-semibold">
                  Images:
                  <span className="font-normal text-gray-600 ml-2">
                     The first image will be the cover (max 6)
                  </span>
               </p>
               <div className="flex gap-4">
                  <input
                     className="p-3 border border-gray-300 rounded w-full"
                     type="file"
                     id="images"
                     accept="image/*"
                     multiple
                  />
                  <button
                     type="button"
                     className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                  >
                     Upload
                  </button>
               </div>
               <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                  Create listing
               </button>
            </div>
         </form>
      </main>
   );
};

export default CreateListing;
