import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/skiper-ui/theme-provider";
import { Toggle } from "@/components/ui/Toggle";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <Toggle /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
