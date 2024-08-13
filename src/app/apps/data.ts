import { AppSectionData } from "./types";

export const appSections: AppSectionData[] = [
  {
    id: "main",
    apps: [
      {
        id: 1,
        name: "Money Manager",
        description: "Where the heck did all my money go?",
        image: "/images/apps/money-manager.jpeg",
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
        image: "/images/apps/options-scenarios.jpeg",
        link: "apps/trading/options-scenarios"
      },
      {
        id: 2,
        name: "Position Size Calculator",
        description: "Calculate the size of your position",
        image: "/images/apps/position-size-calculator.jpeg",
        link: "apps/trading/position-size-calculator"
      },
      {
        id: 3,
        name: "Risk Calculator",
        description:
          "How much of your portfolio as at risk with this position?",
        image: "/images/apps/risk-calculator.jpeg",
        link: "apps/trading/risk-calculator"
      },
      {
        id: 4,
        name: "Shares to Buy",
        description: "How many shares should you buy?",
        image: "/images/apps/shares-to-buy.jpeg",
        link: "apps/trading/shares-to-buy"
      }
    ]
  }
];
