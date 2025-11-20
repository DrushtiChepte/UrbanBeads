"use client";

import { navbar } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Twirl as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav
        className={`navbar ${
          showNavbar ? "translate-y-0" : "-translate-y-24"
        } transition-transform duration-400 z-50`}
      >
        <Link href="/">
          <Image src={"/logo.svg"} alt="logo" width={100} height={60} />
        </Link>
        <div className="md:flex gap-20 hidden relative">
          {navbar.map((item, index) => {
            return (
              <div
                key={item.title}
                onMouseEnter={() => item.children && setOpenIndex(index)}
                onMouseLeave={() => item.children && setOpenIndex(null)}
                className=""
              >
                <Link
                  href={item.path || "#"}
                  className="border-b-2 border-transparent hover:border-b-brown hover:font-semibold transition-all duration-300"
                >
                  {item.title}
                </Link>
                {item.children && openIndex === index && (
                  <div className="dropdown-menu">
                    {item.children.map((c) => {
                      return (
                        <Link
                          className="flex items-center gap-4  hover:translate-y-1 transition-all duration-300"
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

        <div className="flex items-center justify-center gap-2">
          <Link href="/cart">
            <Image
              src={"/shopping-bag.png"}
              alt="cart"
              width={25}
              height={25}
              className="hover:scale-110 transition-transform duration-300"
            />
          </Link>
          <Link href="/login">
            <Image
              src={"/person.png"}
              alt="person"
              width={25}
              height={25}
              className="ml-2 hover:scale-110 transition-transform duration-300"
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
