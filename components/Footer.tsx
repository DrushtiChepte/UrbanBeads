"use client";
import { footerLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname();
  return (
    <footer
      className={`mt-20 bg-beige text-brown ${
        pathName === "/admin" || pathName === "/admin/login" ? "hidden" : ""
      }`}
    >
      <div className=" max-w-7xl mx-auto px-10 md:px-0 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="fade-up">
          <h2 className="text-xl font-semibold">UrbanBeads 🤍</h2>
          <p className="text-sm mt-2">
            Handmade jewellery crafted with love and care. Unique, minimal &
            made for everyday elegance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="fade-up">
          <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-brown/80">
            {footerLinks.map((link) => (
              <li key={link.title}>
                <a href={link.path} className="hover:underline">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="fade-up">
          <h3 className="text-sm font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-brown/80">
            {/* <li>
              📞 WhatsApp:{" "}
              <a
                href="https://wa.me/91XXXXXXXXXX"
                className="underline hover:text-brown"
                rel="noopener noreferrer"
              >
                +91 XXXXXXXXXX
              </a>
            </li> */}
            <li>
              📷 Instagram:{" "}
              <a
                href="https://www.instagram.com/__urbanbeads/"
                className="underline hover:text-brown"
                rel="noopener noreferrer"
              >
                @__urbanbeads
              </a>
            </li>
            <li>📍 Pune, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t py-4 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} UrbanBeads. All rights reserved.
        <br />
        Designed with 💖 by Drushti Chepte.
      </div>
    </footer>
  );
};

export default Footer;
