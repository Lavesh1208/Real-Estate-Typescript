import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputfieldProps {
   id: string;
   inputType: string;
   defaultValue?: string | number;
   placeHolderText: string;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors;
}

const InputField: React.FC<InputfieldProps> = ({
   id,
   inputType,
   placeHolderText,
   register,
   errors,
}) => {
   return (
      <div>
         <input
            id={id}
            type={inputType}
            placeholder={placeHolderText}
            className="border border-gray-300 p-3 rounded-lg w-full"
            {...register(id, {
               value: true,
               required:
                  id === 'newPassword'
                     ? false
                     : `${id[0].toUpperCase() + id.slice(1)} is required`,
            })}
         />

         {errors[id]?.message && (
            <p className="text-red-500 text-sm mt-1">
               {errors[id]?.message?.toString()}
            </p>
         )}
      </div>
   );
};

export default InputField;
