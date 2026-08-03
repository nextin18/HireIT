import Image from "next/image";
import Link from "next/link";

export default function Home() {


  return (
    <div className="h-full w-full bg-gray-200">
      <button><Link href="/login">Sign in</Link></button>
      <button><Link href="/register">Sign up</Link></button>
    </div>
  );
}
