import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/Provider";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibePick || 10 minutes grocery delivery App",
  description: "10 minutes grocery delivery App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen bg-linear-to-b from-vibe-charcoal via-[#121212] to-black text-white selection:bg-vibe-orange selection:text-white">
        <Provider>
          <Navbar />
          <main className="">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
