import { supabase } from "@/supabase-client";

export type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  primary_category: string;
  categories: string[];
  images: string[];
  videos: string[];
  created_at: string;
};

type ProductInsertInput = {
  images: File[];
  videos: File[];
  title: string;
  primaryCategory: string;
  categories: string[];
  price: number;
};

type ProductUpdateInput = {
  oldSlug: string;
  newImages: File[];
  existingImages: string[];
  newVideos: File[];
  existingVideos: string[];
  title: string;
  primaryCategory: string;
  categories: string[];
  price: number;
};

const normalizeCategories = (
  primaryCategory: string,
  categories: string[] = [],
) => {
  const normalizedPrimaryCategory = primaryCategory.toLowerCase().trim();

  return Array.from(
    new Set(
      [normalizedPrimaryCategory, ...categories]
        .map((category) => category.toLowerCase().trim())
        .filter(Boolean),
    ),
  );
};

const normalizeProduct = (product: Partial<Product> & Record<string, unknown>) => {
  const primaryCategory =
    typeof product.primary_category === "string" ? product.primary_category : "";

  const categoryList = Array.isArray(product.categories)
    ? product.categories.filter(
        (category): category is string => typeof category === "string",
      )
    : primaryCategory
      ? [primaryCategory]
      : [];

  return {
    ...product,
    primary_category: primaryCategory,
    categories: normalizeCategories(primaryCategory, categoryList),
  } as Product;
};

export const getPrimaryCategory = (product: Pick<Product, "primary_category">) =>
  product.primary_category;

export const getProductHref = (product: Pick<Product, "slug" | "primary_category">) =>
  `/products/${getPrimaryCategory(product)}/${product.slug}`;

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching products:", error);
  }
  return (data || []).map((product) => normalizeProduct(product));
};

export async function fetchProductsByCategory(category: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .contains("categories", [category]);
  if (error) {
    console.error("Error fetching products:", error);
  }
  return (data || []).map((product) => normalizeProduct(product));
}

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const addProduct = async ({
  images,
  videos,
  title,
  primaryCategory,
  categories,
  price,
}: ProductInsertInput) => {
  try {
    const normalizedCategories = normalizeCategories(primaryCategory, categories);
    const storageCategory = normalizedCategories[0];
    const uploadedImageUrls: string[] = [];
    for (const image of images) {
      const cleanName = image.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9.\-]/g, "");

      const fileName = `${storageCategory}/${crypto.randomUUID()}-${cleanName}`;

      const { data, error } = await supabase.storage
        .from("All-Products")
        .upload(fileName, image);

      if (error) {
        console.error("FULL IMAGE ERROR:", error);
        continue;
      }

      if (data) {
        const imageUrl = supabase.storage
          .from("All-Products")
          .getPublicUrl(fileName).data.publicUrl;
        uploadedImageUrls.push(imageUrl);
      }
    }

    const uploadedVideoUrls: string[] = [];

    for (const video of videos) {
      const cleanName = video.name
        .toLowerCase()
        .replace(/\s+/g, "-") // replace spaces with -
        .replace(/[^a-z0-9.\-]/g, ""); // remove special characters

      const filePath = `${storageCategory}/${crypto.randomUUID()}-${cleanName}`;

      const { error } = await supabase.storage
        .from("All-Products")
        .upload(filePath, video, { contentType: video.type });

      if (error) throw error;

      const { data } = supabase.storage
        .from("All-Products")
        .getPublicUrl(filePath);

      uploadedVideoUrls.push(data.publicUrl);
    }

    const slug = generateSlug(title);

    const { data, error } = await supabase.from("products").insert([
      {
        title,
        slug,
        price,
        primary_category: storageCategory,
        categories: normalizedCategories,
        images: uploadedImageUrls,
        videos: uploadedVideoUrls,
      },
    ]);
    if (error) {
      console.error("Error adding product:", error.message);
      return { success: false };
    }

    return data;
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false };
  }
};

export const editProduct = async ({
  oldSlug,
  newImages,
  existingImages,
  newVideos,
  existingVideos,
  title,
  primaryCategory,
  categories,
  price,
}: ProductUpdateInput) => {
  try {
    const bucket = "All-Products";
    const normalizedCategories = normalizeCategories(primaryCategory, categories);
    const storageCategory = normalizedCategories[0];

    //fetch old files
    const { data: oldMedia, error: fetchError } = await supabase
      .from("products")
      .select("images , videos")
      .eq("slug", oldSlug)
      .single();

    if (fetchError) throw fetchError;

    const oldImages = Array.isArray(oldMedia?.images) ? oldMedia.images : [];

    const oldVideos = Array.isArray(oldMedia?.videos) ? oldMedia.videos : [];

    //detect removed files
    const removedFiles = [...oldImages, ...oldVideos].filter(
      (url: string) =>
        !existingImages.includes(url) && !existingVideos.includes(url),
    );

    //delete removed files from storage

    const filesToDelete = removedFiles
      .map((url: string) => {
        try {
          const parsed = new URL(url);
          const parts = parsed.pathname.split("/");
          const bucketIndex = parts.indexOf(bucket);
          return bucketIndex !== -1
            ? parts.slice(bucketIndex + 1).join("/")
            : null;
        } catch {
          return null;
        }
      })
      .filter(Boolean) as string[];

    if (filesToDelete.length > 0) {
      await supabase.storage.from(bucket).remove(filesToDelete);
    }

    let finalImages = [...existingImages];

    if (newImages.length > 0) {
      const uploadedImageUrls: string[] = [];

      for (const image of newImages) {
        const cleanName = image.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9.\-]/g, "");

        const fileName = `${storageCategory}/${crypto.randomUUID()}-${cleanName}`;

        const { error } = await supabase.storage
          .from("All-Products")
          .upload(fileName, image);

        if (error) throw error;

        const { data } = supabase.storage
          .from("All-Products")
          .getPublicUrl(fileName);

        uploadedImageUrls.push(data.publicUrl.trim());
      }
      finalImages = uploadedImageUrls;
    }

    let finalVideos = [...existingVideos];

    if (newVideos.length > 0) {
      const uploadedVideoUrls: string[] = [];

      for (const video of newVideos) {
        const cleanName = video.name
          .toLowerCase()
          .replace(/\s+/g, "-") // replace spaces with -
          .replace(/[^a-z0-9.\-]/g, ""); // remove special characters

        const filePath = `${storageCategory}/${crypto.randomUUID()}-${cleanName}`;
        const { error } = await supabase.storage

          .from("All-Products")
          .upload(filePath, video, { contentType: video.type });

        if (error) throw error;

        const { data } = supabase.storage
          .from("All-Products")
          .getPublicUrl(filePath);

        uploadedVideoUrls.push(data.publicUrl.trim());
      }

      finalVideos = uploadedVideoUrls;
    }

    const newSlug = generateSlug(title);

    const { error } = await supabase
      .from("products")
      .update({
        title,
        slug: newSlug,
        primary_category: storageCategory,
        categories: normalizedCategories,
        price,
        images: finalImages,
        videos: finalVideos,
      })
      .eq("slug", oldSlug);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("error editing product:", error);
    return { success: false };
  }
};

export const deleteProduct = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("images, videos")
      .eq("slug", slug)
      .single();

    if (error) throw error;

    const bucket = "All-Products";

    const allFiles = [
      ...(Array.isArray(data?.images) ? data.images : []),
      ...(Array.isArray(data?.videos) ? data.videos : []),
    ]
      .map((url: string) => {
        const index = url.indexOf(`/public/${bucket}/`);
        return index !== -1
          ? url.substring(index + `/public/${bucket}/`.length)
          : null;
      })
      .filter((file): file is string => Boolean(file));

    if (allFiles.length > 0) {
      const { error: storageError } = await supabase.storage
        .from(bucket)
        .remove(allFiles);

      if (storageError) throw storageError;
    }

    await supabase.from("products").delete().eq("slug", slug);

    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false };
  }
};
