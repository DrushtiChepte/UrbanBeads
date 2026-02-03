"use client";
import { categories } from "@/lib/constants";
import { useRevealOnScroll } from "@/lib/scrollAnimation";
import Image from "next/image";
import Link from "next/link";

const Shop = () => {
  useRevealOnScroll();
  return (
    <section
      id="shop"
      className="text-brown py-10 mt-10 px-0 flex flex-col gap-10"
    >
      <div className="heading text-center my-5 fade-up">Shop by category</div>
      {/* categories grid */}
      <div className="grid grid-cols-3 lg:grid-cols-6 2xl:grid-cols-6 gap-4 mt-5">
        {categories.map((category) => (
          <Link
            href={category.path}
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
      <Link
        href={"/products"}
        className="flex items-center justify-center gap-2 underline text-lg md:text-lg ld:text-xl"
      >
        <p>Shop All</p>
        <Image
          src="/right-arrow-brown.svg"
          alt="arrow"
          width={12}
          height={12}
        />
      </Link>
    </section>
  );
};

export default Shop;
