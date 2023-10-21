import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputfieldProps {
   id: string;
   inputType: string;
   defaultValue?: string | number;
   placeHolderText: string;
   isRequired?: boolean;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors;
}

const InputField: React.FC<InputfieldProps> = ({
   id,
   inputType,
   placeHolderText,
   isRequired,
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
                  isRequired &&
                  `${id[0].toUpperCase() + id.slice(1)} is required`,
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
