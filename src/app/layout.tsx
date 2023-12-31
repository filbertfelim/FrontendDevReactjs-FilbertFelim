import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BrowserRouter } from "react-router-dom";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurants",
  description: "Restaurants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
