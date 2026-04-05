"use client";

import { useCart } from "@/context/CartContext";
import {
  buildInstagramOrderMessage,
  INSTAGRAM_PROFILE_URL,
  SHIPPING_FEE,
} from "@/lib/instagram";
import Image from "next/image";
import { toast } from "sonner";

export default function CartPage() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();

  const checkoutMessage = buildInstagramOrderMessage(
    items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    })),
  );

  const handleInstagramOrder = async () => {
    try {
      await navigator.clipboard.writeText(checkoutMessage);
      toast.success("Order message copied. Paste it in the Instagram DM.");
    } catch {
      toast.error("Couldn't copy the order message. Please try again.");
      return;
    }

    window.open(INSTAGRAM_PROFILE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#F7F1E7] px-4 py-16 mt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#5E4C3A] mb-8">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-[#7A6755] shadow-sm">
            <p className="text-lg font-medium text-[#5E4C3A]">
              Your cart is empty right now.
            </p>
            <p className="mt-2">
              Add a few handcrafted favorites and come back here to place your
              order.
            </p>
          </div>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item.slug}
                className="bg-white rounded-2xl p-4 mb-4 flex gap-4"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-[#5E4C3A]">{item.title}</h3>
                  <p className="text-[#7A6755]">Rs. {item.price}</p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.slug,
                          Math.max(item.quantity - 1, 0),
                        )
                      }
                      className="px-3 py-1 border rounded-full cursor-pointer shadow-lg"
                      aria-label={`Decrease quantity for ${item.title}`}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.slug, item.quantity + 1)
                      }
                      className="px-3 py-1 border rounded-full cursor-pointer shadow-lg"
                      aria-label={`Increase quantity for ${item.title}`}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.slug)}
                      className="ml-auto text-sm text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-white rounded-2xl p-6 mt-8">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>

              <div className="flex justify-between text-sm text-[#7A6755] mb-4">
                <span>Shipping</span>
                <span>Rs. {SHIPPING_FEE}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>Rs. {subtotal + SHIPPING_FEE}</span>
              </div>

              <button
                type="button"
                onClick={handleInstagramOrder}
                className="block w-full bg-brown text-white py-3 rounded-full hover:bg-[#5E4C3A] transition text-center"
              >
                Order via Instagram
              </button>
              <div className="mt-3 text-sm text-[#7A6755]">
                <p className="font-medium text-brown mb-2">
                  How to place your order:
                </p>

                <div className="space-y-1.5">
                  <p>1. Click “Order via Instagram”</p>
                  <p>2. Message will be copied automatically</p>
                  <p>3. Open Instagram chat</p>
                  <p>4. Paste and send your message</p>
                </div>
              </div>
              <button
                onClick={clearCart}
                className="w-full mt-3 text-sm text-[#7A6755] underline underline-offset-4"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
