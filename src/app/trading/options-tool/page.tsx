"use client";
import React, { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

type Scenario = {
  id: string;
  targetPrice: number;
  strikes: { strikePrice: number; contractPrice: number }[];
};

type Stock = {
  symbol: string;
  name: string;
  price: number;
};

const OptionsScenario: React.FC = () => {
  const [stock, setStock] = useState<Stock>({ symbol: "", name: "", price: 0 });
  const [budget, setBudget] = useState<number>(0);
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: "1", targetPrice: 0, strikes: [{ strikePrice: 0, contractPrice: 0 }] }
  ]);

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStock({ ...stock, symbol: e.target.value.toUpperCase() });
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(e.target.value));
  };

  const handleScenarioChange = (
    id: string,
    field: "targetPrice",
    value: number
  ) => {
    setScenarios(
      scenarios.map((scenario) =>
        scenario.id === id ? { ...scenario, [field]: value } : scenario
      )
    );
  };

  const handleStrikeChange = (
    scenarioId: string,
    index: number,
    field: "strikePrice" | "contractPrice",
    value: number
  ) => {
    setScenarios(
      scenarios.map((scenario) =>
        scenario.id === scenarioId
          ? {
              ...scenario,
              strikes: scenario.strikes.map((strike, i) =>
                i === index ? { ...strike, [field]: value } : strike
              )
            }
          : scenario
      )
    );
  };

  const addScenario = () => {
    const newId = String(scenarios.length + 1);
    setScenarios([
      ...scenarios,
      {
        id: newId,
        targetPrice: 0,
        strikes: [{ strikePrice: 0, contractPrice: 0 }]
      }
    ]);
  };

  const removeScenario = (id: string) => {
    setScenarios(scenarios.filter((scenario) => scenario.id !== id));
  };

  const addStrike = (scenarioId: string) => {
    setScenarios(
      scenarios.map((scenario) =>
        scenario.id === scenarioId
          ? {
              ...scenario,
              strikes: [
                ...scenario.strikes,
                { strikePrice: 0, contractPrice: 0 }
              ]
            }
          : scenario
      )
    );
  };

  const removeStrike = (scenarioId: string, index: number) => {
    setScenarios(
      scenarios.map((scenario) =>
        scenario.id === scenarioId
          ? {
              ...scenario,
              strikes: scenario.strikes.filter((_, i) => i !== index)
            }
          : scenario
      )
    );
  };

  const calculateProfit = (
    scenario: Scenario,
    strike: { strikePrice: number; contractPrice: number }
  ): number => {
    const { targetPrice } = scenario;
    const { strikePrice, contractPrice } = strike;
    const numberOfContracts = Math.floor(budget / contractPrice);
    return (
      (targetPrice - strikePrice) * numberOfContracts * 100 -
      contractPrice * numberOfContracts
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Options Scenario Tool
      </h1>

      <div className="mb-4">
        <label htmlFor="stock" className="block mb-2">
          Stock Symbol
        </label>
        <input
          id="stock"
          type="text"
          value={stock.symbol}
          onChange={handleStockChange}
          className="w-full p-2 border rounded"
          placeholder="Enter stock symbol"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="budget" className="block mb-2">
          Budget
        </label>
        <input
          id="budget"
          type="number"
          value={budget || ""}
          onChange={handleBudgetChange}
          className="w-full p-2 border rounded"
          placeholder="Enter your budget"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Scenarios</h2>
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="mb-4 p-4 border rounded">
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-medium">Scenario {scenario.id}</h3>
              {scenarios.length > 1 && (
                <button
                  onClick={() => removeScenario(scenario.id)}
                  className="text-red-500"
                >
                  <MinusCircle size={20} />
                </button>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor={`targetPrice-${scenario.id}`}
                className="block mb-1"
              >
                Target Price
              </label>
              <input
                id={`targetPrice-${scenario.id}`}
                type="number"
                value={scenario.targetPrice || ""}
                onChange={(e) =>
                  handleScenarioChange(
                    scenario.id,
                    "targetPrice",
                    Number(e.target.value)
                  )
                }
                className="w-full p-2 border rounded"
                placeholder="Enter target price"
              />
            </div>
            {scenario.strikes.map((strike, index) => (
              <div key={index} className="mb-2 p-2 border rounded">
                <div className="flex justify-between mb-2">
                  <h4 className="font-medium">Strike {index + 1}</h4>
                  {scenario.strikes.length > 1 && (
                    <button
                      onClick={() => removeStrike(scenario.id, index)}
                      className="text-red-500"
                    >
                      <MinusCircle size={16} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`strikePrice-${scenario.id}-${index}`}
                      className="block mb-1"
                    >
                      Strike Price
                    </label>
                    <input
                      id={`strikePrice-${scenario.id}-${index}`}
                      type="number"
                      value={strike.strikePrice || ""}
                      onChange={(e) =>
                        handleStrikeChange(
                          scenario.id,
                          index,
                          "strikePrice",
                          Number(e.target.value)
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Enter strike price"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`contractPrice-${scenario.id}-${index}`}
                      className="block mb-1"
                    >
                      Contract Price
                    </label>
                    <input
                      id={`contractPrice-${scenario.id}-${index}`}
                      type="number"
                      value={strike.contractPrice || ""}
                      onChange={(e) =>
                        handleStrikeChange(
                          scenario.id,
                          index,
                          "contractPrice",
                          Number(e.target.value)
                        )
                      }
                      className="w-full p-2 border rounded"
                      placeholder="Enter contract price"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <strong>Estimated Profit:</strong>{" "}
                  {scenario.targetPrice &&
                  strike.strikePrice &&
                  strike.contractPrice
                    ? `$${calculateProfit(scenario, strike).toFixed(2)}`
                    : ""}
                </div>
              </div>
            ))}
            <button
              onClick={() => addStrike(scenario.id)}
              className="mt-2 text-blue-500"
            >
              <PlusCircle size={20} className="inline mr-2" /> Add Strike
            </button>
          </div>
        ))}
        <button
          onClick={addScenario}
          className="flex items-center text-blue-500"
        >
          <PlusCircle size={20} className="mr-2" /> Add Scenario
        </button>
      </div>
    </div>
  );
};

export default OptionsScenario;
