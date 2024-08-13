import type { Metadata } from "next";

import Header from "@/components/Header";

import "./globals.css";
import { Happy_Monkey, Lilita_One } from "next/font/google";

const happyMonkey = Happy_Monkey({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-happy-monkey"
});

const lilitaOne = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita-one"
});

export const metadata: Metadata = {
  title: "Banana Boogie",
  description: "Banana that boogies"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${happyMonkey.variable} ${lilitaOne.variable}`}>
      <body>
        <main className="min-h-screen bg-yellow-200">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
