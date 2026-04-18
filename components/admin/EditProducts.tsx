"use client";

import { useState } from "react";
import Image from "next/image";
import ImageUploader from "./ImageUploader";

import { editProduct } from "@/lib/product";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { StoreCategory } from "@/lib/categories";

type Product = {
  id?: string;
  title: string;
  primary_category: string;
  categories: string[];
  price: number;
  images: string[];
  videos: string[] | string;
  slug: string;
};

const reorderItems = <T,>(items: T[], fromIndex: number, toIndex: number) => {
  if (fromIndex === toIndex) return items;

  const nextItems = [...items];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, movedItem);
  return nextItems;
};

const EditProducts = ({
  product,
  onClose,
  onSuccess,
}: {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
  categories: StoreCategory[];
}) => {
  const selectableCategories = categories.filter(
    (category) =>
      category.slug !== "all" &&
      (category.is_active || product.categories.includes(category.slug)),
  );
  const [title, setTitle] = useState(product.title);
  const [primaryCategory, setPrimaryCategory] = useState(product.primary_category);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    product.categories.length > 0
      ? product.categories
      : [product.primary_category],
  );
  const [price, setPrice] = useState(product.price);
  const [loading, setLoading] = useState(false);
  const [uploaderResetToken, setUploaderResetToken] = useState(0);
  const [draggedExistingImageIndex, setDraggedExistingImageIndex] = useState<
    number | null
  >(null);

  const [existingImages, setExistingImages] = useState<string[]>(
    product.images,
  );
  const [newImages, setNewImages] = useState<File[]>([]);

  const [existingVideos, setExistingVideos] = useState<string[]>(
    Array.isArray(product.videos)
      ? product.videos
      : product.videos
        ? [product.videos]
        : [],
  );

  const [newVideos, setNewVideos] = useState<File[]>([]);

  const handleFiles = (files: File[]) => {
    const imgs = files.filter((f) => f.type.startsWith("image"));
    const vids = files.filter((f) => f.type.startsWith("video"));

    const totalImages = existingImages.length + imgs.length;
    const totalVideos = existingVideos?.length + vids.length;

    if (totalImages > 5) {
      toast("You can only upload up to 5 images");
      return;
    }

    if (totalVideos > 1) {
      toast("Only 1 video allowed");
      return;
    }

    setNewImages(imgs);
    setNewVideos(vids);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (price <= 0) {
      toast("Price must be greater than 0");
      return;
    }

    if (existingImages.length + newImages.length === 0) {
      toast("At least one image is required");
      return;
    }

    try {
      setLoading(true);

      await editProduct({
        oldSlug: product.slug,
        newImages,
        existingImages,
        newVideos,
        existingVideos,
        title,
        primaryCategory,
        categories: selectedCategories,
        price,
      });

      toast.success("Product updated successfully");
      setUploaderResetToken((currentToken) => currentToken + 1);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleUpdate} className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-brown">Edit Product</h2>
        <p className="mt-1 text-sm text-brown/70">
          Update media, category placement, title, and price.
        </p>
      </div>

      <ImageUploader
        key={uploaderResetToken}
        onChange={handleFiles}
        maxFiles={5}
      />

      <div className="flex gap-2 flex-wrap">
        {existingImages.map((img, i) => (
          <div
            key={img}
            draggable
            onDragStart={() => setDraggedExistingImageIndex(i)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggedExistingImageIndex === null) return;
              setExistingImages((currentImages) =>
                reorderItems(currentImages, draggedExistingImageIndex, i),
              );
              setDraggedExistingImageIndex(null);
            }}
            onDragEnd={() => setDraggedExistingImageIndex(null)}
            className={`group relative cursor-move ${
              draggedExistingImageIndex === i ? "opacity-60" : ""
            }`}
          >
            <Image
              src={img}
              alt={`Existing image ${i + 1}`}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded border"
            />

            <Button
              type="button"
              onClick={() =>
                setExistingImages((prev) =>
                  prev.filter((_, index) => index !== i),
                )
              }
              className="absolute top-0 left-0 bg-black/40 w-full h-full text-white text-lg opacity-0 hover:opacity-100 flex items-center justify-center"
            >
              ✕
            </Button>
            <div className="absolute left-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
              {i + 1}
            </div>
          </div>
        ))}

        {existingVideos
          ?.filter(
            (vid) =>
              typeof vid === "string" && vid.length > 0 && !vid.includes("{}"),
          )
          .map((vid, i) => (
            <div key={i} className="group relative">
              <video
                src={vid}
                className="w-20 h-20 object-cover rounded border"
              />

              <Button
                type="button"
                onClick={() =>
                  setExistingVideos((prev) =>
                    prev.filter((_, index) => index !== i),
                  )
                }
                className="absolute top-0 left-0 bg-black/40 w-full h-full text-white text-lg opacity-0 hover:opacity-100 flex items-center justify-center"
              >
                ✕
              </Button>
            </div>
          ))}
      </div>

      {existingImages.length > 1 ? (
        <p className="text-xs text-brown/70">
          Drag existing thumbnails to change their display order.
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-brown">
            Primary Category
          </span>
          <select
            value={primaryCategory}
            onChange={(e) => {
              const nextPrimaryCategory = e.target.value;
              setPrimaryCategory(nextPrimaryCategory);
              setSelectedCategories((currentCategories) =>
                currentCategories.includes(nextPrimaryCategory)
                  ? currentCategories
                  : [...currentCategories, nextPrimaryCategory],
              );
            }}
            className="border p-2 w-full rounded"
          >
            {selectableCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </label>

        <div className="space-y-2">
          <span className="text-sm font-medium text-brown">
            Show In Categories
          </span>
          <div className="grid grid-cols-2 gap-2 rounded border p-3">
            {selectableCategories.map((category) => (
              <label
                key={category.slug}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={
                    selectedCategories.includes(category.slug) ||
                    primaryCategory === category.slug
                  }
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedCategories((currentCategories) =>
                        currentCategories.includes(category.slug)
                          ? currentCategories
                          : [...currentCategories, category.slug],
                      );
                      return;
                    }

                    if (primaryCategory === category.slug) {
                      return;
                    }

                    setSelectedCategories((currentCategories) =>
                      currentCategories.filter(
                        (selectedCategory) =>
                          selectedCategory !== category.slug,
                      ),
                    );
                  }}
                />
                <span>{category.title}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-brown">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-brown">Price</span>
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 w-full rounded"
          />
        </label>
      </div>

      <div className="flex flex-col-reverse gap-2 pt-2 md:flex-row md:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="cursor-pointer"
        >
          Cancel
        </Button>

        <Button
          disabled={loading}
          className="bg-brown rounded-sm cursor-pointer"
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </form>
  );
};

export default EditProducts;
