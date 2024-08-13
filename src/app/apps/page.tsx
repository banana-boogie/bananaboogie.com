import React from "react";
import Image from "next/image";
import Link from "next/link";
import { App, AppSectionData } from "./types";
import { appSections } from "./data";

const AppCard: React.FC<App> = ({ name, description, image, link }) => (
  <Link href={link} className="block">
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={image}
        alt={name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </Link>
);

const AppSection: React.FC<AppSectionData> = ({ title, apps }) => (
  <div className="mb-16">
    {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {apps.map((app) => (
        <AppCard key={app.id} {...app} />
      ))}
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {appSections.map((section) => (
        <AppSection key={section.id} {...section} />
      ))}
    </div>
  );
}
