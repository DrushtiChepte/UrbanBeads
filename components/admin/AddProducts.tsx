"use client";
import { useCallback, useState } from "react";
import ImageUploader from "./ImageUploader";
import { Button } from "../ui/button";
import { addProduct } from "@/lib/product";
import { toast } from "sonner";
import { categories as categoryOptions } from "@/lib/constants";

const selectableCategories = categoryOptions.filter(
  (category) => category.slug !== "all",
);

const AddProducts = ({ onSuccess }: { onSuccess: () => void }) => {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  /* Handle uploader result */
  const handleFilesChange = useCallback((files: File[]) => {
    const imgs = files.filter((f) => f.type.startsWith("image"));
    const vids = files.filter((f) => f.type.startsWith("video"));

    if (imgs.length > 5) {
      toast("Maximum 5 images allowed");
      return;
    }

    if (vids.length > 1) {
      toast("Only 1 video allowed");
      return;
    }

    setImages(imgs);
    setVideos(vids);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!primaryCategory || !title || price <= 0 || images.length === 0) {
      toast("Please fill in all fields and upload at least one image.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      await addProduct({
        images,
        videos,
        primaryCategory,
        categories: selectedCategories,
        title,
        price,
      });

      toast("Product added successfully!");
      onSuccess();

      // reset
      setImages([]);
      setVideos([]);
      setPrimaryCategory("");
      setSelectedCategories([]);
      setTitle("");
      setPrice(0);
    } catch (error) {
      console.error("Error adding product:", error);
      toast("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <ImageUploader onChange={handleFilesChange} maxFiles={5} />

        <label>
          Primary Category:
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
            required
            className="border p-2 w-full mt-1 rounded"
          >
            <option value="">Select a category</option>
            {selectableCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Show In Categories:</legend>
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
          <p className="text-xs text-brown/70">
            The primary category controls the product URL and storage folder.
          </p>
        </fieldset>

        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border p-2 w-full mt-1 rounded"
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="border p-2 w-full mt-1 rounded"
          />
        </label>

        <Button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-brown/90 text-white py-2 px-4 rounded cursor-pointer hover:bg-brown transition-colors"
        >
          {loading ? "Uploading..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
};

export default AddProducts;
