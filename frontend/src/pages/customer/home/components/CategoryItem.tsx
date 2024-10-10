type CategoryItemProps = {
  title: string;
  description: string;
  image: string;
};

export default function CategoryItem(prop: CategoryItemProps) {
  return (
    <div className="max-w-fit bg-secondary-light py-4 px-8">
      <img className="mx-auto w-32 md:w-max" src={prop.image} alt="" />
      <p className="text-black font-serif text-2xl md:text-2xl font-medium uppercase">
        {prop.title}
      </p>
      <p className="text-gray-500 text-xs sm:text-sm">{prop.description}</p>
    </div>
  );
}
