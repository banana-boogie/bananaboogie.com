import Header from "@/components/Header";
import React from "react";

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
