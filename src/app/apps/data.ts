import { AppSectionData } from "./types";

export const appSections: AppSectionData[] = [
  {
    id: "main",
    apps: [
      {
        id: 1,
        name: "Money Manager",
        description: "Where the heck did all my money go?",
        image: "/images/apps/money-manager.png",
        link: "/apps/money-manager"
      }
    ]
  },
  {
    id: "trading",
    title: "Trading Tools",
    apps: [
      {
        id: 1,
        name: "Options Scenarios",
        description: "Plan out scenarios for your options trades",
        image: "/images/apps/options-scenarios.png",
        link: "apps/options-scenarios"
      }
    ]
  }
];
