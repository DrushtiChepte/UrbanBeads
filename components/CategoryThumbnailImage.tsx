"use client";

import { getCategoryFallbackImage } from "@/lib/categories";
import Image from "next/image";
import { useState } from "react";

type CategoryThumbnailImageProps = {
  src: string;
  alt: string;
  slug: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
};

const CategoryThumbnailImage = ({
  src,
  alt,
  slug,
  width,
  height,
  fill = false,
  className,
}: CategoryThumbnailImageProps) => {
  const fallbackSrc = getCategoryFallbackImage(slug);
  const [hasError, setHasError] = useState(false);
  const imageSrc = hasError ? fallbackSrc : src || fallbackSrc;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      className={className}
      onError={() => {
        if (!hasError && imageSrc !== fallbackSrc) {
          setHasError(true);
        }
      }}
    />
  );
};

export default CategoryThumbnailImage;
