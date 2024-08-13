import React from "react";
import type { Metadata } from "next";

import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Banana Apps",
  description: "A showcase of apps made by bananas"
};

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-yellow-50">
      <Header title="Banana Apps" />
      <main className="p-8">{children}</main>
    </div>
  );
}
