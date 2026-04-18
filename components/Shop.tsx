"use client";
import { StoreCategory } from "@/lib/categories";
import { useRevealOnScroll } from "@/lib/scrollAnimation";
import CategoryThumbnailImage from "./CategoryThumbnailImage";
import Link from "next/link";

const Shop = ({ categories }: { categories: StoreCategory[] }) => {
  useRevealOnScroll();
  return (
    <section id="shop" className="text-brown flex flex-col gap-5">
      <div className="heading text-center my-5 fade-up">Shop By Category</div>
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
            <div className="w-20 h-20 xl:w-28 xl:h-28 rounded-full overflow-hidden bg-[#f8f5f2] flex items-center justify-center">
              <CategoryThumbnailImage
                key={category.thumbnail_image}
                src={category.thumbnail_image}
                alt={category.title}
                slug={category.slug}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
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
