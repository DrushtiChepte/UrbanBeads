"use client";

import {
  StoreCategory,
  createStoreCategory,
  setStoreCategoryActiveState,
} from "@/lib/categories";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function CategoryManager({
  categories,
  onSuccess,
}: {
  categories: StoreCategory[];
  onSuccess: () => Promise<void> | void;
}) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [togglingCategoryId, setTogglingCategoryId] = useState<string | null>(null);

  const handleAddCategory = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a category name.");
      return;
    }

    try {
      setSubmitting(true);
      const response = await createStoreCategory({ title });

      if (!response.success) {
        toast.error(response.message ?? "Could not create category.");
        return;
      }

      toast.success(
        response.restored
          ? "Category restored successfully."
          : "Category added successfully.",
      );
      setTitle("");
      await onSuccess();
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Could not create category.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleCategory = async (category: StoreCategory) => {
    const nextActiveState = !category.is_active;

    try {
      setTogglingCategoryId(category.id);

      const response = await setStoreCategoryActiveState({
        categoryId: category.id,
        isActive: nextActiveState,
      });

      if (!response.success) {
        toast.error("Could not update category.");
        return;
      }

      toast.success(
        nextActiveState
          ? `${category.title} restored.`
          : `${category.title} removed from active categories.`,
      );
      await onSuccess();
    } catch (error) {
      console.error("Error toggling category:", error);
      toast.error("Could not update category.");
    } finally {
      setTogglingCategoryId(null);
    }
  };

  return (
    <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-brown">Manage Categories</h2>
        <p className="mt-1 text-sm text-brown/70">
          Add new categories and hide or restore existing ones for the store and
          product forms.
        </p>
      </div>

      <form onSubmit={handleAddCategory} className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a new category"
          className="w-full rounded-lg border px-4 py-2"
        />
        <Button
          type="submit"
          disabled={submitting}
          className="bg-brown/90 hover:bg-brown"
        >
          {submitting ? "Saving..." : "Add Category"}
        </Button>
      </form>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {categories
          .filter((category) => category.slug !== "all")
          .map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-xl border border-brown/10 p-4"
            >
              <div>
                <p className="font-medium text-brown">{category.title}</p>
                <p className="text-xs text-brown/60">{category.slug}</p>
                <p className="mt-1 text-xs text-brown/70">
                  {category.is_active ? "Active" : "Hidden"}
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                disabled={togglingCategoryId === category.id}
                onClick={() => handleToggleCategory(category)}
                className="min-w-24"
              >
                {togglingCategoryId === category.id
                  ? "Saving..."
                  : category.is_active
                    ? "Remove"
                    : "Restore"}
              </Button>
            </div>
          ))}
      </div>
    </section>
  );
}
