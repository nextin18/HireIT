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
            {/* Upper navigation */}
            <Navigation />

            {/* Main layout */}
            <div className="grid h-[calc(100vh-80px)] grid-cols-[240px_1fr]">
                {/* Side Navigation */}
                <aside className="h-full overflow-hidden border-r border-(--thirdColor) px-4 py-5 bg-(--primaryColor)">
                    <SideNevigation />
                </aside>

                {/* Pages layout */}
                <main className="min-w-0 overflow-y-auto">
                    {children}
                </main>
            </div>
        </>
    );
}