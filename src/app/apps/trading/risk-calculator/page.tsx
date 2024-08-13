"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { formatNumberWithCommas } from "@/lib/utils/index";
import { calculatePortfolioAtRisk } from "@/lib/utils/trading";

type FormData = {
  portfolioSize: number | null;
  entryPrice: number | null;
  exitPrice: number | null;
  positionSize: number | null;
};

export default function RiskCalculator() {
  const { register, watch } = useForm<FormData>({
    defaultValues: {
      portfolioSize: null,
      entryPrice: null,
      exitPrice: null,
      positionSize: null
    }
  });

  const [portfolioAtRisk, setPortfolioAtRisk] = useState<number | null>(null);
  const [portfolioAtRiskPercentage, setPortfolioAtRiskPercentage] = useState<
    number | null
  >(null);

  const portfolioSize = watch("portfolioSize");
  const entryPrice = watch("entryPrice");
  const exitPrice = watch("exitPrice");
  const positionSize = watch("positionSize");

  useEffect(() => {
    const calculatePortfolioRisk = () => {
      // Only calculate if all inputs are valid numbers
      if (portfolioSize && entryPrice && exitPrice && positionSize) {
        const inputs = {
          entryPrice,
          exitPrice,
          portfolioSize,
          positionSize
        };

        const result = calculatePortfolioAtRisk(inputs);
        setPortfolioAtRisk(result.value);
        setPortfolioAtRiskPercentage(result.percent);
      } else {
        // Reset results if inputs are invalid
        setPortfolioAtRisk(null);
        setPortfolioAtRiskPercentage(null);
      }
    };

    const debouncedCalculatePortfolioRisk = setTimeout(
      calculatePortfolioRisk,
      300
    );
    return () => clearTimeout(debouncedCalculatePortfolioRisk);
  }, [portfolioSize, entryPrice, exitPrice, positionSize]);

  return (
    <div className="container mx-auto p-8 pb-12 bg-white">
      <h1 className="text-4xl font-bold mb-8">Risk Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">
          <span className="text-gray-700">Portfolio Size</span>
          <input
            {...register("portfolioSize", {
              valueAsNumber: true,
              required: "This field is required",
              min: { value: 0, message: "Value must be positive" }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0"
          />
        </label>
      </div>
      <div className="space-y-4 mb-8">
        <label className="block">
          <span className="text-gray-700">Position Size</span>
          <input
            {...register("positionSize", {
              valueAsNumber: true,
              required: "This field is required",
              min: { value: 0, message: "Value must be positive" }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Entry Price</span>
          <input
            {...register("entryPrice", {
              valueAsNumber: true,
              required: "This field is required",
              min: { value: 0, message: "Value must be positive" }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0.00"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Exit Price</span>
          <input
            {...register("exitPrice", {
              valueAsNumber: true,
              required: "This field is required",
              min: { value: 0, message: "Value must be positive" }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0.00"
          />
        </label>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Portfolio at Risk:</h2>
        {portfolioAtRisk === null || portfolioAtRiskPercentage === null ? (
          <p>Waiting for valid inputs...</p>
        ) : (
          <p className="text-lg">
            {portfolioAtRiskPercentage.toFixed(2)}% ($
            {formatNumberWithCommas(portfolioAtRisk.toFixed(2))})
          </p>
        )}
      </div>
    </div>
  );
}
