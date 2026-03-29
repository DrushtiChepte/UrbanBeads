"use client";

import { Product } from "@/lib/product";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;

    const width = scrollRef.current.clientWidth;

    scrollRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;

    const index = Math.round(scrollLeft / width);
    setCurrentIndex(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group"
    >
      <Link
        href={`/products/${product.category}/${product.slug}`}
        className="block p-3"
      >
        {/* IMAGE CAROUSEL */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full aspect-4/5 overflow-x-auto flex snap-x snap-mandatory scroll-smooth scrollbar-none"
          >
            {product.images?.map((img, i) => (
              <div key={i} className="relative min-w-full h-full snap-start">
                <Image
                  src={img}
                  fill
                  alt={product.title}
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/*ARROWS (DESKTOP ONLY) */}
          <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToIndex(Math.max(currentIndex - 1, 0));
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur p-2 rounded-full shadow"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToIndex(
                  Math.min(currentIndex + 1, product.images.length - 1),
                );
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur p-2 rounded-full shadow"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute bottom-2 w-full flex justify-center gap-1">
            {product.images?.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex ? "w-4 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* TEXT */}
        <h3 className="text-brown text-lg font-semibold font-secondary truncate mt-3">
          {product.title}
        </h3>

        <p className="text-brown font-semibold mt-1">₹{product.price}</p>
      </Link>

      {/* BUTTON */}
      <div className="px-3">
        <Button className="bg-brown/90 w-full hover:bg-brown transition-colors">
          Add to cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
