"use client";

import { StoreCategory, updateCategoryThumbnail } from "@/lib/categories";
import CategoryThumbnailImage from "../CategoryThumbnailImage";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function CategoryThumbnailManager({
  categories,
  onSuccess,
}: {
  categories: StoreCategory[];
  onSuccess: () => Promise<void> | void;
}) {
  const [uploadingSlug, setUploadingSlug] = useState<string | null>(null);

  const handleThumbnailChange = async (
    category: StoreCategory,
    file: File | null,
  ) => {
    if (!file) return;

    const isSupportedType = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ].includes(file.type);

    if (!isSupportedType) {
      toast.error("Please upload a PNG, JPG, or WEBP image.");
      return;
    }

    try {
      setUploadingSlug(category.slug);

      const response = await updateCategoryThumbnail({
        categoryId: category.id,
        slug: category.slug,
        file,
      });

      if (!response.success) {
        toast.error("Could not update category thumbnail.");
        return;
      }

      toast.success(`${category.title} thumbnail updated.`);
      await onSuccess();
    } catch (error) {
      console.error("Error updating category thumbnail:", error);
      toast.error("Could not update category thumbnail.");
    } finally {
      setUploadingSlug(null);
    }
  };

  return (
    <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-brown">
          Category Thumbnails
        </h2>
        <p className="mt-1 text-sm text-brown/70">
          Update the images used in the shop-by-category section and the shop
          dropdown in the navbar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border border-brown/10 p-4"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f8f5f2]">
              <CategoryThumbnailImage
                key={category.thumbnail_image}
                src={category.thumbnail_image}
                alt={category.title}
                slug={category.slug}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-3">
              <p className="font-medium text-brown">{category.title}</p>
              <p className="text-xs text-brown/60">{category.slug}</p>
            </div>

            <label className="mt-3 block">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                className="hidden"
                onChange={(event) =>
                  handleThumbnailChange(
                    category,
                    event.target.files?.[0] ?? null,
                  )
                }
              />
              <Button
                type="button"
                disabled={uploadingSlug === category.slug}
                className="mt-3 w-full bg-brown/90 hover:bg-brown"
                asChild
              >
                <span>
                  {uploadingSlug === category.slug
                    ? "Uploading..."
                    : "Change Thumbnail"}
                </span>
              </Button>
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
