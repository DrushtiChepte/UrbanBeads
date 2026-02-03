"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

const Sidebar = () => {
  const { signOut } = useAuth();
  const [isSignOut, setIsSignOut] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const router = useRouter();

  const handleSignOut = () => {
    setIsSignOut(true);
  };

  useEffect(() => {
    if (isSignOut) {
      signOut();
      router.push("/");
    }
  }, [isSignOut, signOut, router]);
  return (
    <section className="">
      <div className="fixed top-0 left-0 right-0 z-40 md:hidden bg-beige border-b h-14 flex items-center px-4">
        <Drawer open={isOpen} onOpenChange={setOpen} modal>
          <DrawerTrigger asChild>
            <button>
              <Hamburger
                size={25}
                toggled={isOpen}
                toggle={setOpen}
                duration={0.4}
              />
            </button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="text-center text-brown">
                Urban Beads
              </DrawerTitle>
              <DrawerDescription className="text-brown/65 text-center">
                Admin Panel
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 space-y-2">
              <Button className="w-full text-left" variant="ghost">
                All Products
              </Button>
              <Button className="w-full text-left" variant="ghost">
                Bracelets
              </Button>
              <Button className="w-full text-left" variant="ghost">
                Necklaces
              </Button>
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="border-red-800 text-red-800 flex gap-2"
                >
                  Sign Out
                  <Image
                    src="/sign-out-icon.svg"
                    alt="Logout"
                    width={22}
                    height={22}
                    className="transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-80"
                  />
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <aside className="fixed top-0 left-0 h-screen w-64 bg-beige border-r hidden lg:flex flex-col py-10">
        {/* Brand */}
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-brown">Urban Beads</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-brown bg-brown/10 font-medium">
            All Products
          </Button>

          <Button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-brown hover:bg-brown/10 transition">
            Bracelets
          </Button>

          <Button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-brown hover:bg-brown/10 transition">
            Necklaces
          </Button>
        </nav>

        <div className="border">
          <div className="flex justify-center py-2">
            <Button
              onClick={handleSignOut}
              className="
    group relative flex items-center gap-2
    rounded-xl border border-gray-200
    bg-white px-4 py-2
    font-semibold text-gray-800
    shadow-sm
    transition-all duration-200
 hover:border-red-200 hover:text-red-600
    active:scale-95
  "
            >
              <span>Sign out</span>

              <Image
                src="/sign-out-icon.svg"
                alt="Logout"
                width={22}
                height={22}
                className="
      transition-transform duration-200
      group-hover:translate-x-1
      group-hover:opacity-80 w-6 h-6
    "
              />
            </Button>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
