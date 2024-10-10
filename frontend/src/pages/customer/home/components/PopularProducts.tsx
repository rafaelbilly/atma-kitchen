import placeholder from "../../../../assets/images/products/top-product.png";
import PopularProductItem from "./PopularProductItem";

export default function PopularProducts() {
  const topProducts = [
    {
      image: placeholder,
      title: "Lapis Legit",
      description:
        "A rich, decadent layered cake made from butter, flour, sugar, and eggs, baked to perfection and enjoyed for its sweet taste and dense texture, often served as a special treat for celebrations or gatherings.",
    },
    {
      image: placeholder,
      title: "Lapis Surabaya",
      description:
        "A rich, decadent layered cake made from butter, flour, sugar, and eggs, baked to perfection and enjoyed for its sweet taste and dense texture, often served as a special treat for celebrations or gatherings.",
    },
    {
      image: placeholder,
      title: "Mandarin",
      description:
        "A rich, decadent layered cake made from butter, flour, sugar, and eggs, baked to perfection and enjoyed for its sweet taste and dense texture, often served as a special treat for celebrations or gatherings.",
    },
    {
      image: placeholder,
      title: "Matcha Creamy Latte",
      description:
        "A rich, decadent layered cake made from butter, flour, sugar, and eggs, baked to perfection and enjoyed for its sweet taste and dense texture, often served as a special treat for celebrations or gatherings.",
    },
    {
      image: placeholder,
      title: "Roti Sosis",
      description:
        "A rich, decadent layered cake made from butter, flour, sugar, and eggs, baked to perfection and enjoyed for its sweet taste and dense texture, often served as a special treat for celebrations or gatherings.",
    },
    {
      image: placeholder,
      title: "Choco Creamy Latte",
      description:
        "A rich, decadent layered cake made from butter, flour, sugar, and eggs, baked to perfection and enjoyed for its sweet taste and dense texture, often served as a special treat for celebrations or gatherings.",
    },
    {
      image: placeholder,
      title: "Spioke",
      description:
        "A rich, decadent layered cake made from butter, flour, sugar, and eggs, baked to perfection and enjoyed for its sweet taste and dense texture, often served as a special treat for celebrations or gatherings.",
    },
    {
      image: placeholder,
      title: "Keripik Kentang",
      description:
        "A rich, decadent layered cake made from butter, flour, sugar, and eggs, baked to perfection and enjoyed for its sweet taste and dense texture, often served as a special treat for celebrations or gatherings.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto text-center my-20 px-4">
      <h5 className="font-serif text-3xl text-black font-medium">
        TOP PRODUCT
      </h5>
      <p className="text-sm md:text-lg font-light text-gray-500">
        Enjoy unparalleled excellence with our top-rated products, meticulously
        curated to redefine your standards of quality and performance.
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 px-10 mt-8 gap-y-6">
        {topProducts.map((product, index) => (
          <PopularProductItem {...product} key={index} />
        ))}
      </div>
    </div>
  );
}
