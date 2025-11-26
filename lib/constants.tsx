export const navbar = [
  { title: "Home", path: "/" },
  {
    title: "Shop",
    path: "#shop",
    children: [
      {
        image: "/images/placeholder.png",
        title: "Necklaces",
        path: "/shop/necklaces",
      },
      {
        image: "/images/placeholder.png",
        title: "Bracelets",
        path: "/shop/bracelets",
      },
      {
        image: "/images/placeholder.png",
        title: "Anklets",
        path: "/shop/anlets",
      },
      {
        image: "/images/placeholder.png",
        title: "Phone Charms",
        path: "/shop/phone-charms",
      },
      {
        image: "/images/placeholder.png",
        title: "Bag Charms",
        path: "/shop/bag-charms",
      },
      {
        image: "/images/placeholder.png",
        title: "Keychains",
        path: "/shop/keychains",
      },
    ],
  },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export const categories = [
  {
    image: "/images/placeholder.png",
    title: "Necklaces",
    path: "/shop/necklaces",
  },
  {
    image: "/images/placeholder.png",
    title: "Bracelets",
    path: "/shop/bracelets",
  },
  {
    image: "/images/placeholder.png",
    title: "Anklets",
    path: "/shop/anlets",
  },
  {
    image: "/images/placeholder.png",
    title: "Phone Charms",
    path: "/shop/phone-charms",
  },
  {
    image: "/images/placeholder.png",
    title: "Bag Charms",
    path: "/shop/bag-charms",
  },
  {
    image: "/images/placeholder.png",
    title: "Keychains",
    path: "/shop/keychains",
  },
];

export const footerLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Shop", path: "#shop" },
  { title: "Privacy Policy", path: "/privacy" },
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
    subtitle: "WhatsApp confirmation",
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
    title: "7 Days Return Policy",
    subtitle: "For damaged items",
    icon: (
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          d="M21 12a9 9 0 10-9 9"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 3v6h-6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
