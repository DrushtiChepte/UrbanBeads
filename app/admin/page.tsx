"use client";

import AddProducts from "@/components/admin/AddProducts";
import EditProducts from "@/components/admin/EditProducts";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { deleteProduct, fetchProducts } from "@/lib/product";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminPage() {
  const [productsLoading, setProductsLoading] = useState(true);
  const [products, setProducts] = useState<Array<any>>([]);
  const [activeImage, setActiveImage] = useState<Record<string, number>>({});
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.replace("/login");
    }
  }, [isAdmin, isLoading, router]);

  const getProducts = async () => {
    setProductsLoading(true);
    const products = await fetchProducts();
    setProducts(products);
    setProductsLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      getProducts();
    }
  }, [isAdmin]);

  if (isLoading || !isAdmin || productsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (!isAdmin) {
    return null;
  }

  const handleDelete = async (slug: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    const response = await deleteProduct(slug);

    if (response.success) {
      toast.success("Product deleted successfully!");
      getProducts();
    } else {
      toast.error("Failed to delete product");
    }
  };

  if (productsLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="h-screen max-w-7xl mx-auto py-10 overflow-x-hidden scrollbar-hide">
      <p className="heading text-center">Admin Dashboard</p>

      <div className="px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Add Product Card */}
          <div className="border flex items-center justify-center p-2">
            <AddProducts onSuccess={getProducts} />
          </div>

          {products.map((product) => {
            const images = Array.isArray(product.images) ? product.images : [];

            const videos = Array.isArray(product.videos) ? product.videos : [];

            const mixedMedia = [
              ...images.map((url: string) => ({ type: "image", url })),
              ...videos.map((url: string) => ({ type: "video", url })),
            ];

            const activeIndex = activeImage[product.id] ?? 0;
            const currentMedia = mixedMedia[activeIndex];

            return (
              <div
                key={product.id}
                className="group relative bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Edit Modal */}
                {editingProduct?.id === product.id && (
                  <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-50">
                    <EditProducts
                      product={editingProduct}
                      onClose={() => setEditingProduct(null)}
                      onSuccess={getProducts}
                    />
                  </div>
                )}

                {/* Main Media */}
                <div className="relative aspect-4/5 bg-black overflow-hidden">
                  {currentMedia?.type === "image" ? (
                    <Image
                      src={currentMedia.url}
                      alt={product.slug}
                      fill
                      className="object-cover"
                    />
                  ) : currentMedia?.type === "video" ? (
                    <video
                      src={currentMedia.url}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>

                {/* Thumbnails */}
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
                      className={`w-12 h-12 rounded-lg overflow-hidden border transition-transform duration-300 hover:scale-110 ${
                        activeImage[product.id] === index
                          ? "border-brown"
                          : "border-gray-300"
                      }`}
                    >
                      {item.type === "image" ? (
                        <Image
                          src={item.url}
                          alt="thumbnail"
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <video
                          src={item.url}
                          muted
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-brown/50">Category: {product.category}</p>
                  <h2 className="text-md text-brown line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-lg font-bold text-brown">
                    ₹{product.price}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-center items-center p-2 gap-5 bg-beige/30">
                  <Button onClick={() => handleDelete(product.slug)}>
                    <Image
                      src="/delete-btn.svg"
                      alt="Delete"
                      height={25}
                      width={25}
                    />
                  </Button>

                  <Button onClick={() => setEditingProduct(product)}>
                    <Image src="/edit.png" alt="Edit" height={22} width={22} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
