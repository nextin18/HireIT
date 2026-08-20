"use client"

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/navbar/Navigation";
import SideNevigation from "@/components/navbar/SideNevigation";


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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isCompactViewport, setIsCompactViewport] = useState(false);

    useEffect(() => {
        const mobileQuery = window.matchMedia("(max-width: 1023px)");
        const updateSidebarForViewport = () => {
            setIsCompactViewport(mobileQuery.matches);
            setIsSidebarCollapsed(mobileQuery.matches);
        };

        updateSidebarForViewport();
        mobileQuery.addEventListener("change", updateSidebarForViewport);
        return () => mobileQuery.removeEventListener("change", updateSidebarForViewport);
    }, []);

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

            <motion.aside
                initial={false}
                animate={{ width: isSidebarCollapsed ? 72 : 240 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed bottom-0 left-0 top-20 z-40 overflow-hidden border-r border-(--thirdColor) bg-(--primaryColor) px-3 py-5"
            >
                <SideNevigation
                    isCollapsed={isSidebarCollapsed}
                    onToggle={() => setIsSidebarCollapsed((isCollapsed) => !isCollapsed)}
                />
            </motion.aside>

            <motion.main
                initial={false}
                animate={{ marginLeft: isCompactViewport ? 72 : isSidebarCollapsed ? 72 : 240 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="min-h-screen pt-20"
            >
                {children}
            </motion.main>
        </>
    );
}
