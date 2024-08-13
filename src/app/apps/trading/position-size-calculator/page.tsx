"use client";

import React from "react";
import { useForm } from "react-hook-form";

type FormData = {
  portfolioSize: number;
  sharePrice: number;
  portfolioRisk: number;
  tradeType: "long" | "short";
  tickerSymbol: string;
};

export default function PositionSizeCalculator() {
  const { register, watch } = useForm<FormData>({
    defaultValues: {
      portfolioSize: 0,
      sharePrice: 0,
      portfolioRisk: 0,
      tradeType: "long",
      tickerSymbol: ""
    }
  });

  const portfolioSize = watch("portfolioSize");
  const sharePrice = watch("sharePrice");
  const portfolioRisk = watch("portfolioRisk");
  const tradeType = watch("tradeType");

  const portfolioValueAtRisk = portfolioSize * (portfolioRisk / 100);

  const calculateRiskPoint = (percentChange: number) => {
    return tradeType === "long"
      ? sharePrice * (1 - percentChange / 100)
      : sharePrice * (1 + percentChange / 100);
  };

  const calculateNumberOfShares = (percentChange: number): number => {
    const riskPoint = calculateRiskPoint(percentChange);
    return Math.abs(portfolioValueAtRisk / (sharePrice - riskPoint));
  };

  const calculatePositionSizeValue = (percentChange: number): number => {
    const numberOfShares = calculateNumberOfShares(percentChange);
    return sharePrice * numberOfShares;
  };

  const calculatePositionSizePercentage = (percentChange: number) => {
    const positionSize = calculatePositionSizeValue(percentChange);
    return ((positionSize / portfolioSize) * 100).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-4xl font-bold mb-8">Position Size Calculator</h1>
      <div className="mb-8">
        <label className="block mb-2">
          <span className="text-gray-700">Portfolio Size</span>
          <input
            {...register("portfolioSize", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="50000"
          />
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <span className="text-gray-700">Trade Type</span>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                {...register("tradeType")}
                type="radio"
                value="long"
                className="form-radio"
              />
              <span className="ml-2">Long</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                {...register("tradeType")}
                type="radio"
                value="short"
                className="form-radio"
              />
              <span className="ml-2">Short</span>
            </label>
          </div>
        </div>

        <label className="block">
          <span className="text-gray-700">Share Price</span>
          <input
            {...register("sharePrice", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Portfolio Risk</span>
          <input
            {...register("portfolioRisk", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0"
          />
        </label>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Risk Summary</h2>
        <p className="text-xl">
          $ of portfolio risk: {portfolioValueAtRisk.toFixed(2)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[5, 10, 15, 20, 25, 30].map((risk) => (
          <div key={risk} className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              {tradeType === "long" ? "-" : "+"}
              {risk}% change
            </h3>
            <p>Risk Point: {calculateRiskPoint(risk).toFixed(2)}</p>
            <p># of Shares: {calculateNumberOfShares(risk).toFixed(0)}</p>
            <p>
              Position Size: {calculatePositionSizeValue(risk).toFixed(2)} (
              {calculatePositionSizePercentage(risk)}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
