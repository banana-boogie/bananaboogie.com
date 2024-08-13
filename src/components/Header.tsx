import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link
          href="/"
          className="text-sm bg-white bg-opacity-20 rounded-full overflow-hidden"
        >
          <Image
            src="/images/tropical_circle.png"
            alt="home button"
            width={42}
            height={42}
            className="rounded-full"
          />
        </Link>
        {title && (
          <h1 className="ml-4 text-3xl font-bold text-yellow-800">{title}</h1>
        )}
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
  );
};

export default Header;
