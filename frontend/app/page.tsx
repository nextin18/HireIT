"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hook/useAuth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"
import ReactFlagsSelect from "react-flags-select";
import { PiBell } from "react-icons/pi";
import SearchInput from "@/components/ui/SearchInput";
import NextIn from '@/components/ui/NextIn'


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
    <div className='bg-(--primaryColor) w-full px-10 py-5 flex items-center justify-between border-b border-(--thirdColor)'>

      {/* Logo & Search features */}
      <div className='flex justify-between items-center gap-20 w-2/4'>
        <NextIn />

      </div>
      <div className="flex gap-5">
        <button><Link href="/login">Sign in</Link></button>
        <button><Link href="/register">Sign up</Link></button>
      </div>
    </div>
  );
}
