"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prevFiles) => {
        const combinedFiles = [...prevFiles, ...acceptedFiles].slice(0, maxFiles);
        onChange(combinedFiles);
        return combinedFiles;
      });
    },
    [maxFiles, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/mp4": [".mp4"],
    },
    maxFiles,
  });

  const previews = useMemo(
    () =>
      files.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type,
      })),
    [files],
  );

  useEffect(() => {
    return () => {
      previews.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [previews]);

  const removeImage = (index: number) => {
    setFiles((prevFiles) => {
      const nextFiles = prevFiles.filter((_, itemIndex) => itemIndex !== index);
      onChange(nextFiles);
      return nextFiles;
    });
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;

    setFiles((prevFiles) => {
      const nextFiles = [...prevFiles];
      const [movedFile] = nextFiles.splice(fromIndex, 1);
      nextFiles.splice(toIndex, 0, movedFile);
      onChange(nextFiles);
      return nextFiles;
    });
  };

  return (
    <div className="w-full">
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

      <div className="mt-3 grid grid-cols-4 gap-2">
        {previews.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => setDraggedIndex(index)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggedIndex === null) return;
              moveFile(draggedIndex, index);
              setDraggedIndex(null);
            }}
            onDragEnd={() => setDraggedIndex(null)}
            className={`relative group aspect-square rounded overflow-hidden border cursor-move ${
              draggedIndex === index ? "opacity-60 ring-2 ring-brown/40" : ""
            }`}
          >
            {item.type.startsWith("image") ? (
              <Image
                src={item.url}
                alt={`Preview ${index + 1}`}
                fill
                unoptimized
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
              className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs text-white opacity-0 transition group-hover:opacity-100"
            >
              ✕
            </button>
            <div className="absolute left-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
      {previews.length > 1 ? (
        <p className="mt-2 text-xs text-brown/70">
          Drag thumbnails to set the display order. The first image becomes the
          cover image.
        </p>
      ) : null}
    </div>
  );
}
