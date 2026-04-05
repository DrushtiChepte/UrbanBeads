"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import Hamburger from "hamburger-react";
import { categories } from "@/lib/constants";

type Props = {
  setFilter: (val: string) => void;
  filter: string;
};

const Sidebar = ({ setFilter, filter }: Props) => {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  // 🔥 Clean sign out
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // 🔥 Reusable nav button
  const renderNavButton = ({
    label,
    isActive,
  }: {
    label: string;
    isActive: boolean;
  }) => (
    <Button
      variant="ghost"
      onClick={() => {
        setFilter(label);
        setOpen(false); // close drawer on mobile
      }}
      className={`w-full justify-start text-brown transition ${
        isActive ? "bg-brown/10 font-medium" : "hover:bg-brown/10"
      }`}
    >
      {label}
    </Button>
  );

  return (
    <section>
      {/* 🔥 MOBILE NAV */}
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-beige border-b h-14 flex items-center px-4">
        <Drawer open={isOpen} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button>
              <Hamburger size={25} toggled={isOpen} toggle={setOpen} />
            </button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-center text-brown">
                Urban Beads
              </DrawerTitle>
              <DrawerDescription className="text-center text-brown/60">
                Admin Panel
              </DrawerDescription>
            </DrawerHeader>

            {/* 🔥 NAV ITEMS */}
            <div className="p-4 space-y-2">
              {renderNavButton({
                label: "All Products",
                isActive: filter === "All Products",
              })}

              {categories.map((cat) => (
                <div key={cat.title}>
                  {renderNavButton({
                    label: cat.title,
                    isActive: filter === cat.title,
                  })}
                </div>
              ))}
            </div>

            {/* 🔥 SIGN OUT */}
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-red-500 text-red-500 flex gap-2"
                >
                  Sign Out
                  <Image
                    src="/sign-out-icon.svg"
                    alt="Logout"
                    width={20}
                    height={20}
                  />
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* 🔥 DESKTOP SIDEBAR */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-beige border-r hidden lg:flex flex-col py-6">
        {/* Brand */}
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-brown">Urban Beads</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {renderNavButton({
            label: "All Products",
            isActive: filter === "All Products",
          })}
          {categories.map((cat) => (
            <div key={cat.title}>
              {renderNavButton({
                label: cat.title,
                isActive: filter === cat.title,
              })}
            </div>
          ))}
        </nav>

        {/* Sign out */}
        <div className="px-4">
          <Button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 border rounded-lg bg-white text-gray-800 hover:text-red-600 hover:border-red-200 transition"
          >
            Sign out
            <Image
              src="/sign-out-icon.svg"
              alt="Logout"
              width={20}
              height={20}
            />
          </Button>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
