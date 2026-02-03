"use client";

import AddProducts from "@/components/admin/AddProducts";
import EditProducts from "@/components/admin/EditProducts";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { deleteProduct, fetchProducts } from "@/lib/product";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminPage() {
  const { isLoading } = useAuth();

  const [productsLoading, setProductsLoading] = useState(false);
  const [products, setProducts] = useState<Array<any>>([]);
  const [activeImage, setActiveImage] = useState<Record<string, number>>({});

  const [editingProduct, setEditingProduct] = useState<any>(null);

  const getProducts = async () => {
    setProductsLoading(true);
    const products = await fetchProducts();
    setProducts(products);
    setProductsLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (slug: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    const response = await deleteProduct(slug);

    if (response.success) {
      toast("Product deleted successfully!");
      getProducts();
    } else {
      toast("Failed to delete product");
    }
  };

  return (
    <section className="h-screen max-w-7xl mx-auto py-10 overflow-x-hidden scrollbar-hide">
      <p className="heading text-center">Admin Dashboard</p>
      <div>
        <p className="text-xl px-5 mt-5 mb-2">All Products</p>
      </div>
      <div className="flex justify-center min-h-screen">
        <div>
          {productsLoading || isLoading ? (
            <div className="mt-40 flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="border flex items-center justify-center p-2">
                    <AddProducts onSuccess={getProducts} />
                  </div>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    products.map((product) => {
                      const images = Array.isArray(product.images)
                        ? product.images
                        : [];
                      const videos = Array.isArray(product.videos)
                        ? product.videos
                        : [];

                      const mixedMedia = [
                        ...images.map((url: string) => ({
                          type: "image",
                          url,
                        })),
                        ...videos.map((url: string) => ({
                          type: "video",
                          url,
                        })),
                      ];
                      const activeIndex = activeImage[product.id] ?? 0;
                      const currentMedia =
                        mixedMedia[activeIndex] || mixedMedia[0];

                      console.log(product.videos);

                      return (
                        <div
                          key={product.id}
                          className="group relative bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        >
                          {/* Edit Modal */}
                          {editingProduct &&
                            editingProduct.id === product.id && (
                              <div className="absolute inset-0 bg-white/90 bg-opacity-50 flex flex-col items-center justify-center z-50">
                                <div className="p-2">
                                  <EditProducts
                                    product={editingProduct}
                                    onClose={() => setEditingProduct(null)}
                                    onSuccess={getProducts}
                                  />
                                </div>
                              </div>
                            )}

                          {/* Main Image */}
                          <div className="relative aspect-4/5 overflow-hidden flex items-center justify-center bg-black inset-0">
                            {currentMedia &&
                              (currentMedia.type === "image" ? (
                                <Image
                                  src={
                                    mixedMedia[activeImage[product.id] || 0].url
                                  }
                                  alt={product.slug}
                                  fill
                                  className="object-cover w-full h-full"
                                  loading="eager"
                                />
                              ) : (
                                <video
                                  src={
                                    mixedMedia[activeImage[product.id] || 0].url
                                  }
                                  preload="auto"
                                  className="w-full h-full object-cover aspect-4/5"
                                  autoPlay
                                  muted
                                />
                              ))}
                          </div>

                          {/* Image Thumbnails */}
                          <div className="flex justify-center gap-2 mt-2">
                            {mixedMedia.map((item, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  setActiveImage({
                                    ...activeImage,
                                    [product.id]: index,
                                  })
                                }
                                className={`w-12 h-12 rounded-lg overflow-hidden border hover:scale-110 transition-transform duration-300 ${
                                  activeImage[product.id] === index
                                    ? "border-brown"
                                    : "border-gray-300"
                                }`}
                              >
                                {item.type === "image" ? (
                                  <Image
                                    src={item.url}
                                    alt="thumbnail"
                                    width={32}
                                    height={32}
                                    className="object-cover w-full h-full"
                                    loading="eager"
                                  />
                                ) : (
                                  <div className="relative w-full h-full">
                                    <video
                                      src={item.url}
                                      muted
                                      playsInline
                                      preload="metadata"
                                      crossOrigin="anonymous"
                                      className="w-full h-full object-cover pointer-events-none"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                      ▶
                                    </div>
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>

                          {/* Content */}
                          <div className="p-4 flex flex-col gap-2">
                            <p className="text-brown/50">
                              Category: {product.category}
                            </p>
                            <h2 className="text-md text-brown line-clamp-2">
                              {product.title}
                            </h2>

                            <div className="flex items-center justify-between mt-2">
                              <p className="text-lg font-bold text-brown">
                                ₹{product.price}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-center items-center p-2 gap-5  bg-beige/30 ">
                            <Button onClick={() => handleDelete(product.slug)}>
                              <Image
                                src="/delete-btn.svg"
                                alt="Delete"
                                height={25}
                                width={25}
                                className="cursor-pointer hover:scale-110 transition-transform duration-300"
                              />
                            </Button>
                            <Button onClick={() => setEditingProduct(product)}>
                              <Image
                                src="/edit.png"
                                alt="Edit"
                                height={22}
                                width={22}
                                className="cursor-pointer hover:scale-110 transition-transform duration-300"
                              />
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
