type InputProps = {
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export const InputForm = (props: InputProps) => {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className="peer h-10 w-full border-b border-gray-400 bg-white text-gray-900 focus:outline-none focus:border-primary text-sm md:text-base xl:text-lg"
      required
    />
  );
};


// type PropsInput = {
//   value: string | number | readonly string[] | undefined | Date;
//   type: string;
//   placeholder: string;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   name: string;
// };

// export const Input = (props: PropsInput) => {
//   const value = props.value instanceof Date ? undefined : props.value;
//   return (
//     <input
//       name={props.name}
//       type={props.type}
//       placeholder={props.placeholder}
//       onChange={props.onChange}
//       className="peer h-10 w-full border-b border-gray-400 bg-white text-gray-900 focus:outline-none focus:border-primary text-sm md:text-base xl:text-lg"
//       value={value}
//       required
//     />
//   );
// };
