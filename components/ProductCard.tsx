"use client";

import { Product } from "@/lib/product";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addItem } = useCart();

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
      className="group h-full"
    >
      <Link
        href={`/products/${product.category}/${product.slug}`}
        className="flex flex-col"
      >
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full aspect-4/5 overflow-x-auto flex snap-x snap-mandatory scroll-smooth no-scrollbar bg-[#f5ecdf]"
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

          <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.preventDefault();
                scrollToIndex(Math.max(currentIndex - 1, 0));
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur p-2 rounded-full shadow"
              aria-label="Previous product image"
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
              aria-label="Next product image"
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

        <h3 className="mt-3 min-h-15 text-brown text-lg font-semibold font-secondary line-clamp-2 leading-tight">
          {product.title}
        </h3>

        <p className="mt-1 text-brown font-semibold">Rs. {product.price}</p>
      </Link>

      <div className="mt-2 w-full">
        <Button
          onClick={() => {
            addItem(product);
            toast.success(`${product.title} added to cart`);
          }}
          className="bg-beige w-full hover:bg-brown transition-color mt-2 text-brown hover:text-white"
        >
          Order via Instagram
        </Button>
        <Button
          onClick={() => {
            addItem(product);
            toast.success(`${product.title} added to cart`);
          }}
          className="bg-brown/90 w-full hover:bg-brown transition-colors mt-2"
        >
          Add to cart
        </Button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
