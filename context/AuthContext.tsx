"use client";
import { supabase } from "@/supabase-client";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  isLoading?: boolean;
}

const emailList = process.env.NEXT_PUBLIC_ADMIN_EMAILS
  ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",").map((email) =>
      email.trim().toLowerCase()
    )
  : [];

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserEmail = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!data.user) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }
    if (error) {
      console.error("Error fetching user:", error.message);
      setIsAdmin(false);
    }
    const userEmail = data.user.email?.toLowerCase();
    setIsAdmin(emailList.includes(userEmail || ""));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserEmail();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchUserEmail();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });
    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      setIsAdmin(false);
      console.log("User signed out successfully");
    }
  };
  return (
    <AuthContext.Provider
      value={{ signInWithGoogle, signOut, isAdmin, setIsAdmin, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
