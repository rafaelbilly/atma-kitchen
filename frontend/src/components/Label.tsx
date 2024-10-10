type LabelProps = {
  children: string;
};

export const Label = (props: LabelProps) => {
  return (
    <label className="label p-0">
      <span className="label-text font-serif text-gray-700 text-base md:text-l lg:text-xl">
        {props.children}
      </span>
    </label>
  );
};
