"use client";

import AddProducts from "@/components/admin/AddProducts";
import CategoryThumbnailManager from "@/components/admin/CategoryThumbnailManager";
import EditProducts from "@/components/admin/EditProducts";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { StoreCategory, fetchStoreCategories } from "@/lib/categories";
import { Product, deleteProduct, fetchProducts } from "@/lib/product";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/admin/Sidebar";
import { categories as categoryOptions } from "@/lib/constants";

export default function AdminPage() {
  const [productsLoading, setProductsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [storeCategories, setStoreCategories] = useState<StoreCategory[]>([]);
  const [activeImage, setActiveImage] = useState<Record<string, number>>({});
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [filter, setFilter] = useState("All Products");

  const { isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.replace("/login");
    }
  }, [isAdmin, isLoading, router]);

  const getProducts = async () => {
    setProductsLoading(true);
    const [fetchedProducts, fetchedCategories] = await Promise.all([
      fetchProducts(),
      fetchStoreCategories(true),
    ]);
    setProducts(fetchedProducts);
    setStoreCategories(fetchedCategories);
    setProductsLoading(false);
  };

  useEffect(() => {
    if (!isAdmin) return;

    let isMounted = true;

    const loadProducts = async () => {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        fetchProducts(),
        fetchStoreCategories(true),
      ]);

      if (!isMounted) return;

      setProducts(fetchedProducts);
      setStoreCategories(fetchedCategories);
      setProductsLoading(false);
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
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

  const filteredProducts =
    filter === "All Products" || filter === "Category Thumbnails"
      ? products
      : products.filter((product) =>
          product.categories.includes(
            categoryOptions.find((category) => category.title === filter)?.slug ||
              filter.toLowerCase(),
          ),
        );

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

  return (
    <section className="h-screen max-w-7xl mx-auto py-10 overflow-x-hidden scrollbar-hide">
      <Sidebar setFilter={setFilter} filter={filter} />
      <p className="heading text-center">Admin Dashboard</p>

      <div className="px-4 mt-6">
        {filter === "Category Thumbnails" ? (
          <CategoryThumbnailManager
            categories={storeCategories.filter(
              (category) => category.slug !== "all",
            )}
            onSuccess={getProducts}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Add Product Card */}
          <div className="border flex items-center justify-center p-2">
            <AddProducts onSuccess={getProducts} />
          </div>

          {filteredProducts.map((product) => {
            const images = Array.isArray(product.images) ? product.images : [];

            const videos = Array.isArray(product.videos) ? product.videos : [];

            const mixedMedia = [
              ...images.map((url) => ({ type: "image" as const, url })),
              ...videos.map((url) => ({ type: "video" as const, url })),
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
                        setActiveImage((currentActiveImage) => ({
                          ...currentActiveImage,
                          [product.id]: index,
                        }))
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
                          alt={`${product.title} preview ${index + 1}`}
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
                  <p className="text-brown/50">
                    Primary: {product.primary_category}
                  </p>
                  <p className="text-brown/50 text-sm">
                    Also in: {product.categories.join(", ")}
                  </p>
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
        )}
      </div>
    </section>
  );
}
