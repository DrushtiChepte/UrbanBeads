"use client";
import { navbar } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Twirl as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const pathName = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  // Navbar behavior on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      if (showSearch) setShowSearch(false);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, showSearch]);

  // Close search bar when clicking outside
  useEffect(() => {
    if (!showSearch) return;
    const handleClick = (e: MouseEvent) => {
      const searchElement = document.getElementById("search-bar");
      if (searchElement && !searchElement.contains(e.target as Node))
        setShowSearch(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [showSearch]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 ${
        pathName.startsWith("/admin") ? "hidden" : ""
      }`}
    >
      <div className="absolute top-0 left-0 w-full z-50 transition-transform duration-400">
        <SearchBar translatePosition={showSearch} />
      </div>
      <nav
        className={`navbar ${
          showNavbar ? "translate-y-0" : "-translate-y-24"
        } transition-transform duration-400 z-50 h-25`}
      >
        <Link href="/">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={100}
            height={40}
            className="w-24 h-auto"
          />
        </Link>
        <div className="md:flex gap-20 hidden relative">
          {navbar.map((item, index) => {
            const isActive = pathName === item.path;
            return (
              <div
                key={item.title}
                onMouseEnter={() => item.children && setOpenIndex(index)}
                onMouseLeave={() => item.children && setOpenIndex(null)}
                className="h-25 flex flex-col justify-center items-center"
              >
                <Link
                  href={item.path || "#"}
                  className={`border-b-2 border-transparent hover:border-b-brown transition-all duration-300 ${
                    isActive ? "font-semibold border-b-brown" : ""
                  }`}
                >
                  {item.title}
                </Link>
                {item.children && openIndex === index && (
                  <div className="dropdown-menu">
                    {item.children.map((c) => {
                      return (
                        <Link
                          className="flex items-center gap-4 hover:translate-y-1 transition-all duration-300"
                          key={c.title}
                          href={c.path}
                        >
                          <Image
                            key={c.title}
                            src={c.image}
                            alt={c.title}
                            width={100}
                            height={100}
                            className="rounded-xl object-cover"
                          />
                          <span className="text-lg font-secondary">
                            {c.title}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 px-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="hover:scale-110 transition-transform duration-300 "
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 mx-2 text-brown"
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
          </button>
          <Link href="/cart" className="w-5 h-5 md:w-6 md:h-6">
            <Image
              src={"/shopping-bag.png"}
              alt="cart"
              width={25}
              height={25}
              className="hover:scale-110 transition-transform duration-300"
            />
          </Link>
          {/* mobile menu */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } absolute top-25 left-0 w-full bg-[#ddd8c6] shadow-md md:hidden transition-all duration-400`}
          >
            <div className="flex flex-col items-center gap-2 p-4">
              {navbar.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden block">
            <Hamburger
              size={25}
              toggled={isOpen}
              toggle={setOpen}
              duration={0.4}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
