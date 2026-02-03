"use client";
import { Product } from "@/lib/product";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollArrows from "./ScrollArrows";
import { useRef } from "react";
import { Button } from "./ui/button";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Link key={product.slug} href={`#`} className="group p-3 fade-up">
          <div
            ref={scrollRef}
            className="relative w-full aspect-4/5 overflow-hidden mb-3"
          >
            {product.images?.map((img, i) => (
              <div key={i} className="relative min-w-full h-full">
                <Image
                  src={img}
                  fill
                  alt={product.slug}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <ScrollArrows containerRef={scrollRef} />

          <h3 className="text-brown text-lg font-semibold truncate">
            {product.title}
          </h3>

          <p className="text-brown font-medium mt-1">₹{product.price}</p>
        </Link>
        <div className="w-full">
          <Button className="bg-brown/90 w-full hover:bg-brown transition-colors">
            Add to cart
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
