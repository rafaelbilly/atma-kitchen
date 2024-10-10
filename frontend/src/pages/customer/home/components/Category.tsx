import placehoder from "../../../../assets/images/products/imgPlaceholder.png";
import CategoryItem from "./CategoryItem";

export default function () {
  const categories = [
    {
      title: "Cakes",
      description:
        "delightful dessert made from a blend of ingredients like flour, sugar, and eggs, baked to perfection and enjoyed for its sweet taste and fluffy texture, often adorned with frosting or decorations for special occasions.",
      image: placehoder,
    },
    {
      title: "bread",
      description:
        " a staple food made from flour, water, yeast, and salt, typically baked into a loaf or other shapes, providing sustenance and versatility in various cuisines worldwide.",
      image: placehoder,
    },
    {
      title: "Beverages",
      description:
        "a wide range of liquid refreshments, from hot teas and coffees to cold sodas and juices, offering hydration, enjoyment, and often a burst of flavor to complement meals or quench thirst.",
      image: placehoder,
    },
    {
      title: "Hampers",
      description:
        " thoughtfully curated assortments of gourmet cakes, bread and beverages. Elegantly presented in a basket or container, making them perfect for gifting on special occasions or indulging in a delightful array of treats.",
      image: placehoder,
    },
  ];
  return (
    <div className="max-w-7xl mx-auto text-center my-20 px-4">
      <h5 className="font-serif text-3xl text-black font-medium">
        OUR PRODUCT CATEGORY
      </h5>
      <p className="text-sm md:text-lg font-light gray-500">
        Indulge your senses and satisfy your cravings with our delectable array
        of freshly baked delights to the very moment.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {categories.map((category, index) => (
          <CategoryItem
            title={category.title}
            description={category.description}
            image={category.image}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
