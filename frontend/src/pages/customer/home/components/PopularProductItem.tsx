type PopularProductItemProps = {
  title: string;
  description: string;
  image: string;
};
export default function PopularProductItem(props: PopularProductItemProps) {
  return (
    <div>
      <img
        className="mx-auto w-40 md:w-fit lg:w-56 xl:w-fit"
        src={props.image}
        alt=""
      />
      <p className="text-black font-serif text-xl capitalize font-semibold">
        {props.title}
      </p>
      <p className="text-gray-500 text-xs px-4 line-clamp-2 sm:px-8 md:px-16 lg:px-4">
        {props.description}
      </p>
    </div>
  );
}
