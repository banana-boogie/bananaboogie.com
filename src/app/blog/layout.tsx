import React from "react";
import type { Metadata } from "next";

import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Banana Blog",
  description: "A blog about bananas and more"
};

export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-yellow-50">
      <Header title="Banana Blog" />
      <main className="p-8">{children}</main>
    </div>
  );
}
