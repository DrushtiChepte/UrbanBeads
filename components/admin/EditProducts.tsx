"use client";

import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";

import { editProduct } from "@/lib/product";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Product = {
  title: string;
  category: string;
  price: number;
  images: string[];
  videos: string[];
  slug: string;
};

const EditProducts = ({
  product,
  onClose,
  onSuccess,
}: {
  product: Product;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [title, setTitle] = useState(product.title);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    return () => {
      newImages.forEach((file) => URL.revokeObjectURL(file as any));
      newVideos.forEach((file) => URL.revokeObjectURL(file as any));
    };
  }, [newImages, newVideos]);

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
        category,
        price,
      });

      toast.success("Product updated successfully");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("existingVideos:", existingVideos);
  }, [existingVideos]);

  return (
    <form onSubmit={handleUpdate} className="space-y-3">
      <ImageUploader onChange={handleFiles} maxFiles={5} />

      <div className="flex gap-2 flex-wrap">
        {newImages.map((file, i) => {
          const preview = URL.createObjectURL(file);

          return (
            <img
              key={i}
              src={preview}
              onLoad={() => URL.revokeObjectURL(preview)}
              className="w-20 h-20 object-cover rounded border"
            />
          );
        })}

        {newVideos.map((file, i) => {
          const preview = URL.createObjectURL(file);

          return (
            <video
              key={i}
              src={preview}
              controls
              onLoadedData={() => URL.revokeObjectURL(preview)}
              className="w-20 h-20 object-cover rounded border"
            />
          );
        })}
      </div>

      <div className="flex gap-2 flex-wrap">
        {existingImages.map((img, i) => (
          <div key={i} className="group relative">
            <img src={img} className="w-20 h-20 object-cover rounded border" />

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

      <label>Category:</label>
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <label>Title:</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <label>Price:</label>
      <input
        type="number"
        min={0}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="border p-2 w-full rounded"
      />

      <div className="flex flex-col w-full gap-2">
        <Button
          disabled={loading}
          className="bg-brown rounded-sm cursor-pointer"
        >
          {loading ? "Updating..." : "Update"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="cursor-pointer"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditProducts;
