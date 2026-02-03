"use client";
import { useCallback, useState } from "react";
import ImageUploader from "./ImageUploader";
import { Button } from "../ui/button";
import { addProduct } from "@/lib/product";
import { toast } from "sonner";

const AddProducts = ({ onSuccess }: { onSuccess: () => void }) => {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [category, setCategory] = useState("");
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

    if (!category || !title || price <= 0 || images.length === 0) {
      toast("Please fill in all fields and upload at least one image.");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      await addProduct({
        images,
        videos,
        category,
        title,
        price,
      });

      toast("Product added successfully!");
      onSuccess();

      // reset
      setImages([]);
      setVideos([]);
      setCategory("");
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
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border p-2 w-full mt-1 rounded"
          >
            <option value="">Select a category</option>
            <option value="Necklaces">Necklaces</option>
            <option value="Bracelets">Bracelets</option>
            <option value="Anklets">Anklets</option>
            <option value="Phone Charms">Phone Charms</option>
            <option value="Bag Charms">Bag Charms</option>
            <option value="keychains">keychains</option>
          </select>
        </label>

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
