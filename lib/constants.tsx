import { Snowflake, Ruler, Truck, FileText, Leaf } from "lucide-react";

export const navbar = [
  { title: "Home", path: "/" },
  {
    title: "Shop",
    path: "/#shop",
    children: [
      {
        image: "/images/necklace.webp",
        title: "Necklaces",
        slug: "necklaces",
      },
      {
        image: "/images/blush pearl bracelet.png",
        title: "Bracelets",
        slug: "bracelets",
      },
      {
        image: "/images/anklet.webp",
        title: "Anklets",
        slug: "anklets",
      },
      {
        image: "/images/phone-charm.png",
        title: "Phone Charms",
        slug: "phone-charms",
      },
      {
        image: "/images/bag-charm.png",
        title: "Bag Charms",
        slug: "bag-charms",
      },
      {
        image: "/images/keychain.jpg",
        title: "Keychains",
        slug: "keychains",
      },
      {
        image: "/images/earrings.webp",
        title: "Earrings",
        slug: "earrings",
      },
    ],
  },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export const categories = [
  {
    image: "/images/all.png",
    title: "All Products",
    slug: "all",
  },
  {
    image: "/images/necklace.webp",
    title: "Necklaces",
    slug: "necklaces",
  },
  {
    image: "/images/blush pearl bracelet.png",
    title: "Bracelets",
    slug: "bracelets",
  },
  {
    image: "/images/anklet.webp",
    title: "Anklets",
    slug: "anklets",
  },
  {
    image: "/images/phone-charm.png",
    title: "Phone Charms",
    slug: "phone-charms",
  },
  {
    image: "/images/bag-charm.png",
    title: "Bag Charms",
    slug: "bag-charms",
  },
  {
    image: "/images/keychain.jpg",
    title: "Keychains",
    slug: "keychains",
  },
  {
    image: "/images/earrings.webp",
    title: "Earrings",
    slug: "earrings",
  },
];

export const footerLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Shop", path: "/#shop" },
  { title: "Privacy Policy", path: "/privacy" },
  { title: "Return Policy", path: "/return-policy" },
  { title: "Shipping Policy", path: "/shipping" },
];

export const featuresList = [
  {
    title: "Exclusive Designs",
    subtitle: "Unique, limited pieces",
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M12 2l2 4 4 .5-3 2 1 4-4-2-4 2 1-4-3-2 4-.5L12 2z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Handmade with Love",
    subtitle: "Uniquely crafted in small batches",
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M3 21v-2a4 4 0 014-4h0a4 4 0 014 4v2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 11V7a4 4 0 10-8 0v4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "100% Payment Secure",
    subtitle: "Instagram confirmation",
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <rect
          x="2"
          y="7"
          width="20"
          height="14"
          rx="2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 3v4M8 3v4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Free Shipping",
    subtitle: "On orders above ₹999",
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M3 7h13l4 4v6a1 1 0 01-1 1h-1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7.5" cy="18.5" r="1.5" strokeWidth="1.5" />
        <circle cx="18.5" cy="18.5" r="1.5" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Happy Customers",
    subtitle: "Loved by repeat buyers",
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M20 21v-2a4 4 0 00-3-3.87"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 21v-2a4 4 0 013-3.87"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="7" r="4" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export const ProductDetails = [
  {
    title: "About Findings",
    icon: <Snowflake size={16} />,
    content:
      "Our jewelry is crafted using high-quality materials including glass beads, acrylic charms, and durable elastic string. Each piece is lightweight, skin-friendly, and designed for everyday wear.\n\nPlease note that slight variations may occur due to the handmade nature of our products.",
  },
  {
    title: "Measurement Guides",
    icon: <Ruler size={16} />,
    content:
      "Standard sizes:\n- Stretchable bracelets/Loop bracelets: Diameter approx. 5–7 cm (expandable due to stretchable string). Flexible fit for most wrists\n- Chain bracelets and Anklets: Approx. 15 cm length\n- Necklaces: Approx. 30 cm length\n - Keychain & Bag Charm: approx. 8-12 cm (can customise)\n - Earrings: 4-5 cm \n\nFor a perfect fit:\n- Measure your wrist using a thread or measuring tape\n- Add 0.5 to 1 inch for comfort\n\nIf you need a custom size, feel free to contact us before placing your order.",
  },
  {
    title: "Shipping",
    icon: <Truck size={16} />,
    content:
      "Orders are processed within 2-4 business days.\n\nDelivery time:\n- Within India: 5-7 business days\n\nYou will receive tracking details once your order is shipped.\n\nPlease ensure your shipping address is accurate to avoid delays.",
  },
  {
    title: "Notes",
    icon: <FileText size={16} />,
    content:
      "- All products are handmade with care\n- Colors may slightly vary due to lighting and screen settings\n- Custom orders may take additional time\n\nFor any queries, feel free to reach out to us on Instagram.",
  },
  {
    title: "Jewelry Care",
    icon: <Leaf size={16} />,
    content:
      "To keep your jewelry looking its best:\n\n- Avoid contact with water, perfumes, and chemicals\n- Store in a dry place\n- Handle with care to prevent stretching or breakage\n- Remove before sleeping or exercising\n\nProper care will help your jewelry last longer.",
  },
];
