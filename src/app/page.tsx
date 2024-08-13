import React from "react";
import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-yellow-100">
      <Header />
      <main className="flex-grow flex flex-col justify-center items-center relative">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <Image
            src="/images/banana.svg"
            alt="Banana"
            width={182}
            height={182}
            className="transform rotate-13 translate-x-[82px] translate-y-[-16px]"
          />
        </div>
        <h1 className="text-center z-10 text-monkey-brown relative">
          <span className="block text-4xl font-happy-monkey font-light">
            HELLO
          </span>
          <span className="block text-8xl font-lilita-one">BANANA</span>
        </h1>
      </main>
    </div>
  );
}
