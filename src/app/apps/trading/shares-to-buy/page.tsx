"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { formatNumberWithCommas } from "@/lib/utils/index";
import { calculateSharesToBuy } from "@/lib/utils/trading";

type FormData = {
  portfolioSize: number;
  entryPrice: number;
  exitPrice: number;
  riskPercentage: number;
};

export default function SharesToBuyCalculator() {
  const { register, watch } = useForm<FormData>({
    defaultValues: {
      portfolioSize: 0,
      entryPrice: 0,
      exitPrice: 0,
      riskPercentage: 0
    }
  });

  const [sharesToBuy, setSharesToBuy] = useState(0);

  const portfolioSize = watch("portfolioSize");
  const entryPrice = watch("entryPrice");
  const exitPrice = watch("exitPrice");
  const riskPercentage = watch("riskPercentage");

  useEffect(() => {
    const calculateShares = () => {
      const inputs = {
        entryPrice,
        exitPrice,
        portfolioSize,
        riskPercentage
      };

      const result = calculateSharesToBuy(inputs);
      setSharesToBuy(result);
    };

    const debouncedCalculateShares = setTimeout(calculateShares, 300);
    return () => clearTimeout(debouncedCalculateShares);
  }, [portfolioSize, entryPrice, exitPrice, riskPercentage]);

  const calculateSharesToBuyValue = () => {
    return formatNumberWithCommas((sharesToBuy * entryPrice).toFixed(2));
  };

  const calculatePortfolioRiskValue = () => {
    return (portfolioSize * riskPercentage) / 100;
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-12 bg-white">
      <h1 className="text-4xl font-bold mb-8">Shares to Buy Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">
          <span className="text-gray-700">Portfolio Size</span>
          <input
            {...register("portfolioSize", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder=""
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          <span className="text-gray-700">% Risk</span>
          <input
            {...register("riskPercentage", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0"
          />
        </label>
        <p className="text-sm text-gray-600">
          Amount at Risk: $
          <span className="font-semibold">
            {formatNumberWithCommas(calculatePortfolioRiskValue())}
          </span>
        </p>
      </div>
      <div className="space-y-4 mb-8">
        <label className="block">
          <span className="text-gray-700">Entry Price</span>
          <input
            {...register("entryPrice", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0.00"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Exit Price</span>
          <input
            {...register("exitPrice", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0.00"
          />
        </label>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Number of shares to buy:</h2>
        {Number.isNaN(sharesToBuy) || sharesToBuy === Infinity ? (
          <p>Waiting...</p>
        ) : (
          <p className="text-lg">
            {sharesToBuy} (${calculateSharesToBuyValue()})
          </p>
        )}
      </div>
    </div>
  );
}
