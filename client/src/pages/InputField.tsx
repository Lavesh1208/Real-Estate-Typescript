import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputfieldProps {
   id: string;
   inputType: 'email' | 'password' | 'text' | 'number';
   isTextArea?: boolean;
   min?: string;
   max?: string;
   placeHolderText?: string;
   isRequired?: boolean;
   register: UseFormRegister<FieldValues>;
   errors?: FieldErrors;
}

const InputField: React.FC<InputfieldProps> = ({
   id,
   inputType,
   isTextArea,
   min,
   max,
   placeHolderText,
   isRequired,
   register,
   errors,
}) => {
   if (inputType === 'number') {
      return (
         <input
            id={id}
            type="number"
            placeholder={placeHolderText}
            min={min}
            max={max}
            className="p-3 border border-gray-300 rounded-lg"
            {...register(id)}
         />
      );
   }

   return (
      <>
         {isTextArea ? (
            <textarea
               className="border p-3 rounded-lg"
               id={id}
               placeholder={placeHolderText}
               {...register(id, {
                  required: `${id[0].toUpperCase() + id.slice(1)} is required`,
               })}
            />
         ) : (
            <input
               id={id}
               type={inputType}
               placeholder={placeHolderText}
               className="border border-gray-300 p-3 rounded-lg w-full"
               {...register(id, {
                  value: true,
                  required:
                     isRequired &&
                     `${id[0].toUpperCase() + id.slice(1)} is required`,
               })}
            />
         )}

         {errors && errors[id]?.message && (
            <p className="text-red-500 text-sm mt-1">
               {errors[id]?.message?.toString()}
            </p>
         )}
      </>
   );
};

export default InputField;
