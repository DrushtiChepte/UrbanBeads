"use client";
import { categories } from "@/lib/constants";
import { useRevealOnScroll } from "@/lib/scrollAnimation";
import Image from "next/image";
import Link from "next/link";

const Shop = () => {
  useRevealOnScroll();
  return (
    <section id="shop" className="text-brown flex flex-col gap-5">
      <div className="heading text-center my-5 fade-up">Shop by category</div>
      {/* categories grid */}
      <div className="grid grid-cols-3 lg:grid-cols-6 2xl:grid-cols-6 gap-4 mt-5">
        {categories.map((category) => (
          <Link
            href={
              category.slug === "all"
                ? "/products"
                : `/categories/${category.slug}`
            }
            key={category.title}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition duration-300 fade-up"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-20 h-20 xl:w-30 xl:h-30 object-cover rounded-full "
            />
            <div className="mt-2 text-center whitespace-nowrap text-sm lg:text-lg">
              {category.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Shop;
