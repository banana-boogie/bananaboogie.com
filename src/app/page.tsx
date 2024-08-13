import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-200 flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button className="text-sm bg-white bg-opacity-20 rounded-full overflow-hidden">
            <Image
              src="/images/tropical_circle.png"
              alt="home button"
              width={42}
              height={42}
              className="rounded-full"
            />
          </button>
        </div>
        <nav>
          <Link href="/blog" className="mr-4 hover:underline">
            blog
          </Link>
          <Link href="/apps" className="hover:underline">
            apps
          </Link>
        </nav>
      </header>

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
