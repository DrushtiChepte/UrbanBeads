"use client";

import Link from "next/link";
import { footerLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { INSTAGRAM_PROFILE_URL, openInstagramProfile } from "@/lib/instagram";

const Footer = () => {
  const pathName = usePathname();

  return (
    <footer
      className={`mt-20 bg-beige text-brown ${
        pathName === "/admin" || pathName === "/admin/login" ? "hidden" : ""
      }`}
    >
      <div className=" max-w-7xl mx-auto px-10 md:px-0 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="fade-up">
          <h2 className="text-xl font-semibold">Urban Beads</h2>
          <p className="text-sm mt-2">
            Handmade jewellery crafted with love and care. Unique, minimal and
            made for everyday elegance.
          </p>
        </div>

        <div className="fade-up">
          <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-brown/80">
            {footerLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.path} className="hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up">
          <h3 className="text-sm font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-brown/80">
            <li>
              Instagram:{" "}
              <a
                href={INSTAGRAM_PROFILE_URL}
                className="underline hover:text-brown"
                onClick={(e) => {
                  e.preventDefault();
                  openInstagramProfile();
                }}
                rel="noopener noreferrer"
              >
                @__urbanbeads
              </a>
            </li>
            <li>Pune, Maharashtra</li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-neutral-500">
        &copy; {new Date().getFullYear()} Urban Beads. All rights reserved.
        <br />
        Designed & Developed by Drushti Chepte ♥️.
      </div>
    </footer>
  );
};

export default Footer;
