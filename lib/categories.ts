import { categories as fallbackCategories } from "@/lib/constants";
import { supabase } from "@/supabase-client";

export type StoreCategory = {
  id: string;
  title: string;
  slug: string;
  thumbnail_image: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

const fallbackStoreCategories: StoreCategory[] = fallbackCategories.map(
  (category, index) => ({
    id: category.slug,
    title: category.title,
    slug: category.slug,
    thumbnail_image: category.image,
    sort_order: index,
    is_active: true,
  }),
);

const normalizeCategory = (
  category: Partial<StoreCategory> & Record<string, unknown>,
): StoreCategory => ({
  id: typeof category.id === "string" ? category.id : crypto.randomUUID(),
  title: typeof category.title === "string" ? category.title : "",
  slug: typeof category.slug === "string" ? category.slug : "",
  thumbnail_image:
    typeof category.thumbnail_image === "string"
      ? category.thumbnail_image
      : "/images/placeholder.png",
  sort_order: typeof category.sort_order === "number" ? category.sort_order : 0,
  is_active:
    typeof category.is_active === "boolean" ? category.is_active : true,
  created_at:
    typeof category.created_at === "string" ? category.created_at : undefined,
});

export const fetchStoreCategories = async (includeInactive = false) => {
  let query = supabase.from("categories").select("*").order("sort_order");

  if (!includeInactive) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching categories:", error);
    return fallbackStoreCategories.filter(
      (category) => includeInactive || category.is_active,
    );
  }

  if (!data || data.length === 0) {
    return fallbackStoreCategories.filter(
      (category) => includeInactive || category.is_active,
    );
  }

  return data.map((category) => normalizeCategory(category));
};

export const updateCategoryThumbnail = async ({
  categoryId,
  slug,
  file,
}: {
  categoryId: string;
  slug: string;
  file: File;
}) => {
  const cleanName = file.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-]/g, "");

  const filePath = `categories/${slug}/${crypto.randomUUID()}-${cleanName}`;

  const { error: uploadError } = await supabase.storage
    .from("All-Products")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Error uploading category thumbnail:", uploadError);
    return { success: false };
  }

  const { data } = supabase.storage.from("All-Products").getPublicUrl(filePath);

  const { error: updateError } = await supabase
    .from("categories")
    .update({ thumbnail_image: data.publicUrl })
    .eq("id", categoryId);

  if (updateError) {
    console.error("Error updating category thumbnail:", updateError);
    return { success: false };
  }

  return { success: true, thumbnailImage: data.publicUrl };
};
