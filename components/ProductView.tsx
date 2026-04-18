"use client";

import { useCart } from "@/context/CartContext";
import {
  buildInstagramOrderMessage,
  INSTAGRAM_PROFILE_URL,
} from "@/lib/instagram";
import { Product } from "@/lib/product";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import ProductAccordion from "./ProductAccordian";

export default function ProductView({ product }: { product: Product }) {
  const images =
    product.images?.length > 0 ? product.images : ["/images/placeholder.png"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { addItem, items } = useCart();

  const instagramOrderMessage = buildInstagramOrderMessage(
    items.length > 0
      ? items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
        }))
      : [{ title: product.title, quantity: 1, price: product.price }],
  );

  const handleInstagramOrder = async () => {
    try {
      await navigator.clipboard.writeText(instagramOrderMessage);
      toast.success("Order message copied. Paste it in the Instagram DM.");
    } catch {
      toast.error("Couldn't copy the order message. Please try again.");
      return;
    }

    window.open(INSTAGRAM_PROFILE_URL, "_blank", "noopener,noreferrer");
  };

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
    <div className="mt-28 px-4 lg:max-w-7xl lg:mx-auto min-h-screen text-brown pb-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="flex flex-col gap-4">
          <div
            className="relative w-full aspect-4/5 overflow-hidden bg-[#f5ecdf]"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth no-scrollbar"
            >
              {images.map((img, index) => (
                <div
                  key={img}
                  className="relative min-w-full h-full snap-start"
                >
                  <Image
                    src={img}
                    alt={`${product.title} image ${index + 1}`}
                    fill
                    priority={index === 0}
                    className={`object-cover transition-transform duration-300 ${
                      zoom && index === currentIndex ? "scale-110" : ""
                    }`}
                  />
                </div>
              ))}
            </div>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur p-2 rounded-full shadow hidden  md:flex"
                  aria-label="Previous product image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    scrollToIndex(Math.min(currentIndex + 1, images.length - 1))
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur p-2 rounded-full shadow hidden  md:flex"
                  aria-label="Next product image"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentIndex
                          ? "w-5 bg-white"
                          : "w-2 bg-white/55"
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>

          {images.length > 1 ? (
            <div className="text-xs text-brown/60 md:hidden">
              Swipe to see more product photos
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-5 md:sticky md:top-32">
          <p className="text-sm uppercase tracking-[0.3em] text-brown/60">
            Handcrafted jewelry
          </p>
          <h1 className="text-2xl md:text-4xl font-bold font-primary">
            {product.title}
          </h1>

          <p className="text-2xl font-semibold">Rs. {product.price}</p>

          <p className="text-brown/70 leading-7">
            Thoughtfully handmade to bring a soft, elevated finish to your
            everyday looks. Each Urban Beads piece is designed for gifting,
            stacking, and wearing on repeat.
          </p>

          <button
            onClick={() => {
              addItem(product);
              toast.success(`${product.title} added to cart`);
            }}
            className="bg-brown text-white py-3 rounded-full hover:bg-brown/90 transition"
          >
            Add to cart
          </button>

          <button
            type="button"
            onClick={handleInstagramOrder}
            className="block border border-brown text-brown py-3 rounded-full text-center hover:bg-brown/5 transition"
          >
            Order via Instagram
          </button>

          <p className="text-sm text-brown/70 leading-6">
            Your order message will be copied. Open Instagram DM and paste it to
            place your order.
          </p>

          <div>
            <ProductAccordion />
          </div>
        </div>
      </div>
    </div>
  );
}
