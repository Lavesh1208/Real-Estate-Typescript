import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputCheckboxProps {
   id: string;
   inputType: 'checkbox';
   checked?: boolean;
   register: UseFormRegister<FieldValues>;
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
   id,
   inputType,
   checked,
   register,
}) => {
   return (
      <div>
         <input
            id={id}
            type={inputType}
            className="w-5"
            checked={checked}
            {...register(id)}
         />
      </div>
   );
};

export default InputCheckbox;
