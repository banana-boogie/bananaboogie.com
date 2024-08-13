import { AppSectionData } from "./types";

export const appSections: AppSectionData[] = [
  {
    id: "main",
    apps: [
      {
        id: 1,
        name: "Weather App",
        description: "Check real-time weather updates",
        image: "/api/placeholder/300/200",
        link: "/weather-app"
      },
      {
        id: 2,
        name: "Task Manager",
        description: "Organize your tasks efficiently",
        image: "/api/placeholder/300/200",
        link: "/task-manager"
      }
    ]
  },
  {
    id: "trading",
    title: "Trading Tools",
    apps: [
      {
        id: 3,
        name: "Stock Tracker",
        description: "Monitor your stock portfolio",
        image: "/api/placeholder/300/200",
        link: "/stock-tracker"
      },
      {
        id: 4,
        name: "Crypto Dashboard",
        description: "Track cryptocurrency prices",
        image: "/api/placeholder/300/200",
        link: "/crypto-dashboard"
      },
      {
        id: 5,
        name: "Trading Journal",
        description: "Log and analyze your trades",
        image: "/api/placeholder/300/200",
        link: "/trading-journal"
      }
    ]
  }
];
