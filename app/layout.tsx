import {
  Lato,
  Playfair_Display,
  Imperial_Script,
  Pinyon_Script,
} from "next/font/google";
// @ts-ignore
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Urban Beads",
  description: "Elegant handcrafted jewelry by Urban Beads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} ${pinyonScript.variable} antialiased min-h-screen`}
      >
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <Toaster />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
