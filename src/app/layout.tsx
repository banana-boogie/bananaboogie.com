import type { Metadata } from "next";

import "./globals.css";
import {
  Happy_Monkey,
  Lilita_One,
  Montserrat,
  Open_Sans,
  Noto_Sans_Canadian_Aboriginal
} from "next/font/google";

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

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans"
});

const notoSansCanadianAboriginal = Noto_Sans_Canadian_Aboriginal({
  subsets: ["canadian-aboriginal"],
  weight: ["400", "700"], // You can adjust weights as needed
  variable: "--font-noto-sans-canadian-aboriginal"
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
    <html
      lang="en"
      className={`${happyMonkey.variable} ${lilitaOne.variable} ${montserrat.variable} ${notoSansCanadianAboriginal.variable} ${openSans.variable}`}
    >
      <body>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
