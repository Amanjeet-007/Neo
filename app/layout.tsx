import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MotionProvider, ScrollProgress } from "@/components/Motion";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Build With Neo", template: "%s · Build With Neo" },
  description: "Software projects we have built, and plain-text documentation to build them yourself.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#3347d0", borderRadius: "6px" } }}>
      <html lang="en" className={`${sans.variable} ${mono.variable}`}>
        <body className="font-sans min-h-screen flex flex-col">
          <MotionProvider>
            <ScrollProgress />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </MotionProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
