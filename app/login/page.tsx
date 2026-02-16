"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function AdminLogin() {
  const { signInWithGoogle, isAdmin, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAdmin) {
      router.replace("/admin");
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading) {
    return <div className="mt-40">Loading...</div>;
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center my-10">
        <h2 className="heading">Admin Login</h2>
      </div>
      <div className="h-full flex items-center justify-center border">
        <div className="">
          <button
            onClick={signInWithGoogle}
            className="px-6 py-3 rounded-full border border-gray-600 hover:scale-105 transition flex items-center"
          >
            <Image
              src="/google.svg"
              alt="Google Icon"
              width={20}
              height={20}
              className="mr-2"
            />{" "}
            <p className="font-semibold">Continue with Google</p>
          </button>
        </div>
      </div>
    </div>
  );
}
