import { supabase } from "@/supabase-client";

export type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  images: string[];
  videos: string[];
  created_at: string;
};

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching products:", error);
  }
  return data || [];
};

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
  category,
  price,
}: {
  images: File[];
  videos: File[];
  title: string;
  category: string;
  price: number;
}) => {
  try {
    const uploadedImageUrls: string[] = [];
    for (const image of images) {
      const fileName = `${category}/${crypto.randomUUID()}-${image.name}`;

      const { data, error } = await supabase.storage
        .from("All-Products")
        .upload(fileName, image);

      if (error) {
        console.error("Error uploading image:", error.message);
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
      const filePath = `${category}/${crypto.randomUUID()}-${video.name}`;

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
        category,
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
  category,
  price,
}: {
  oldSlug: string;
  newImages: File[];
  existingImages: string[];
  newVideos: File[];
  existingVideos: string[];
  title: string;
  category: string;
  price: number;
}) => {
  try {
    let finalImages = { ...existingImages };

    if (newImages.length > 0) {
      const uploadedImageUrls: string[] = [];

      for (const image of newImages) {
        const fileName = `${category}/${crypto.randomUUID()}-${image.name}`;

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

    let finalVideos = { ...existingVideos };

    if (newVideos.length > 0) {
      const uploadedVideoUrls: string[] = [];

      for (const video of newVideos) {
        const filePath = `${category}/${crypto.randomUUID()}-${video.name}`;

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
        category,
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
