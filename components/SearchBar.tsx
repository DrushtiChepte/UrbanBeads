"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useRef } from "react";

const SearchBar = ({ translatePosition }: { translatePosition: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = inputRef.current?.value.trim() ?? "";
    const params = new URLSearchParams(searchParams.toString());

    if (trimmedQuery) {
      params.set("q", trimmedQuery);
    } else {
      params.delete("q");
    }

    const targetPath = pathname === "/products" ? pathname : "/products";
    const queryString = params.toString();

    router.push(queryString ? `${targetPath}?${queryString}` : targetPath);
  };

  return (
    <div
      id="search-bar"
      className={`w-screen md:w-[80%] mx-auto px-4 py-3 mb-3 ${
        translatePosition ? "translate-y-24 block " : "translate-y-0 hidden"
      } transition-transform duration-400`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 bg-[#f8f5f2] border border-[#7A6755] rounded-full px-4 py-2 shadow-sm transition-all duration-300 focus-within:border-[#5E4C3A] focus-within:shadow-[0_0_0_3px_rgba(122,103,85,0.25)]"
      >
        <svg
          className="w-5 h-5 text-brown"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>

        <input
          key={searchParams.toString()}
          ref={inputRef}
          type="text"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="Search necklaces, phone charms, bracelets..."
          className="bg-transparent outline-none text-brown placeholder-[#9C8C7A] w-full"
        />
      </form>
    </div>
  );
};

export default SearchBar;
