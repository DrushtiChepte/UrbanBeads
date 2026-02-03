"use client";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface ImageUploaderProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
}

export default function ImageUploader({
  onChange,
  maxFiles = 5,
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);

  /* Handle drop */
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prev) => {
        const combined = [...prev, ...acceptedFiles];
        return combined.slice(0, maxFiles);
      });

      const combined = [...files, ...acceptedFiles].slice(0, maxFiles);

      onChange(combined);
    },
    [files, maxFiles, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/mp4": [".mp4"],
    },
    maxFiles,
  });

  /* Create previews */
  useEffect(() => {
    const urls = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));

    setPreviews(urls);

    return () => {
      urls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [files]);

  /* Remove file */
  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
        ${
          isDragActive
            ? "border-brown bg-brown/10"
            : "border-gray-300 hover:border-brown"
        }`}
      >
        <input {...getInputProps()} />

        {isDragActive ? (
          <span>Drop the images here...</span>
        ) : (
          <p className="mb-2">Drag & drop images here, or click to select</p>
        )}

        <p className="text-xs text-red-400 mt-1">
          Images & videos allowed (max {maxFiles})
        </p>
      </div>

      {/* Preview grid */}
      <div className="mt-3 grid grid-cols-4 gap-2">
        {previews.map((item, index) => (
          <div
            key={index}
            className="relative group aspect-square rounded overflow-hidden border"
          >
            {item.type.startsWith("image") ? (
              <Image
                src={item.url}
                alt="preview"
                fill
                className="object-cover"
              />
            ) : (
              <video
                src={item.url}
                className="w-full h-full object-cover"
                muted
              />
            )}

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-black/70 text-white text-xs rounded-full w-6 h-6 
              flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
