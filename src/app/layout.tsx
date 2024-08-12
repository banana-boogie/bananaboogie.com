import type { Metadata } from "next";
import { Happy_Monkey, Lilita_One } from "next/font/google";

// These styles apply to every route in the application
import "./globals.css";

export const metadata: Metadata = {
  title: "Banana Boogie",
  description: "Banana that boogies"
};

const happyMonkey = Happy_Monkey({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-happy-monkey"
});

const lilitaOne = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-lilita-one"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${happyMonkey.variable} ${lilitaOne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
