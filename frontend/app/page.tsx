"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hook/useAuth";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/home");
    }
  }, [loading, router, user]);

  if (loading || user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full bg-gray-200">
      <button><Link href="/login">Sign in</Link></button>
      <button><Link href="/register">Sign up</Link></button>
    </div>
  );
}
