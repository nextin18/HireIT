"use client"

import { usePathname } from "next/navigation";
import Navigation from "@/components/navbar/Navigation";
import SideNevigation from "@/components/navbar/SideNevigation";
import { NavigationMenuBackdrop } from "@base-ui/react";


// Kya dekh rhe ho? I'm too lazy to start from beggining;😂
// So, I created my own AiOutlineSolution;🔥
// Just set the routh path to show and hide the Navbar according to the user login or logout;😎
// What is benefits of it?🤔
// First, no loading state on Navbar, 🔥
// second, No loading means, Nav load fatser,🚀
// third, no complex coding,😁
// fourt, no need to change folder structure.😁
// Time saving.😎

export default function Applayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Hide the main Navbar from this pages.
    const hiddenRoutes = ["/", "/login", "/register"];

    const isHidden = hiddenRoutes.includes(pathname);

    // Agar Landing, Login ya Register page hai to direct content render hoga
    if (isHidden) {
        return <main className="w-full min-h-screen">{children}</main>;
    }

    // After login, this will be show.
    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 h-20">
                <Navigation />
            </header>

            <aside className="fixed bottom-0 left-0 top-20 z-40 w-60 border-r border-(--thirdColor) bg-(--primaryColor) px-4 py-5">
                <SideNevigation />
            </aside>

            <main className="ml-60 min-h-screen pt-20">
                {children}
            </main>
        </>
    );
}