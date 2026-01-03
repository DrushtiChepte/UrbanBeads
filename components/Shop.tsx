import { categories } from "@/lib/constants";

const Shop = () => {
  return (
    <section id="shop" className="text-brown py-30 lg:py-40 px-5 lg:px-0">
      <div className="heading text-center my-15">Shop by category</div>
      {/* categories grid */}
      <div className="grid grid-cols-3 lg:grid-cols-6 2xl:grid-cols-6 gap-4 mt-5 circle">
        {categories.map((category) => (
          <div
            key={category.title}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition duration-300"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-20 h-20 xl:w-30 xl:h-30 object-cover rounded-full "
            />
            <div className="mt-2 text-center whitespace-nowrap">
              {category.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
