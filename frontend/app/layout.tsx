import type { Metadata } from "next";
import { Geist, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/skiper-ui/theme-provider";
import { Toggle } from "@/components/ui/Toggle";
import { AuthProvider } from "@/store/auth/auth.context";
import { Toaster } from "@/components/ui/shadcn/toast"
import Navigation from "@/components/navbar/Navigation"
import SideNevigation from "@/components/navbar/SideNevigation";
import Applayout from "@/components/layout/Applayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hire IT",
  description: "Hire It is a platform that connects job seekers with employers, providing a seamless experience for both parties. Our mission is to simplify the hiring process and help individuals find their dream jobs while assisting companies in finding the right talent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <Toggle /> */}
          <AuthProvider>
            <Applayout>
              {children}
            </Applayout>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
