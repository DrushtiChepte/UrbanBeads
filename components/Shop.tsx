import { categories } from "@/lib/constants";

const Shop = () => {
  return (
    <div id="shop" className="text-brown/80 my-20">
      <div className="heading">Shop by category</div>
      {/* categories grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-5">
        {categories.map((category) => (
          <div
            key={category.title}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-20 h-20 object-cover rounded-full "
            />
            <div className="mt-2 text-center whitespace-nowrap">
              {category.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
