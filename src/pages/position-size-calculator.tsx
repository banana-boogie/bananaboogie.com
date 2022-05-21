import React, { useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";

import useInput from "../hooks/useInput.hook";

const PositionSizeCalculator: NextPage = () => {
  const portfolioProps = useInput(50000);
  const sharePriceProps = useInput(10);
  const portfolioRiskProps = useInput(3);
  const [tradeTypeValue, setTradeTypeValue] = useState("long");

  const portfolioValueAtRisk =
    portfolioProps.value && portfolioRiskProps.value
      ? portfolioProps.value * (portfolioRiskProps.value / 100)
      : 0;

  const calculateRiskPoint = (percentChange: number) => {
    const riskPoint =
      tradeTypeValue === "long"
        ? sharePriceProps.value * (1 - percentChange / 100)
        : sharePriceProps.value * (1 + percentChange / 100);

    return Number(riskPoint.toFixed(2));
  };

  const calculateNumberOfShares = (percentChange: number): number => {
    const riskPoint = calculateRiskPoint(percentChange);
    return Number(
      Math.abs(
        portfolioValueAtRisk / (sharePriceProps.value - riskPoint)
      ).toFixed(0)
    );
  };

  const calculatePositionSizeValue = (percentChange: number): number => {
    const numberOfShares = calculateNumberOfShares(percentChange);
    return Number((sharePriceProps.value * numberOfShares).toFixed(2));
  };

  const calculatePositionSizePercentage = (percentChange: number) => {
    const positionSize = calculatePositionSizeValue(percentChange);
    return ((positionSize / portfolioProps.value) * 100).toFixed(2);
  };

  return (
    <Wrapper>
      <Title>Postition Size Calculator</Title>
      <PortfolioSizeLabel>
        Portfolio Size
        <Input {...portfolioProps} placeholder="50000" />
      </PortfolioSizeLabel>
      <TradeWrapper>
        <Label>
          Ticker Symbol
          <Input placeholder="TLT" />
        </Label>
        <TradeTypeWrapper>
          <Label>
            Long
            <RadioInput
              type="radio"
              value="long"
              checked={tradeTypeValue === "long"}
              onChange={(e) => setTradeTypeValue(e.target.value)}
            />
          </Label>
          <Label>
            Short
            <RadioInput
              type="radio"
              value="short"
              checked={tradeTypeValue === "short"}
              onChange={(e) => setTradeTypeValue(e.target.value)}
            />
          </Label>
        </TradeTypeWrapper>
        <Label>
          Share Price
          <Input {...sharePriceProps} placeholder="10" />
        </Label>
        <Label>
          Portfolio Risk
          <Input {...portfolioRiskProps} placeholder="3" />
        </Label>
      </TradeWrapper>

      <Summary>
        <RiskSummaryWrapper>
          <RiskSummaryTitle>$ of portfolio risk</RiskSummaryTitle>
          <RiskSummaryValue>{portfolioValueAtRisk}</RiskSummaryValue>
        </RiskSummaryWrapper>
        <RiskScenarioWrapper>
          {[5, 10, 15, 20, 25, 30].map((risk, index) => {
            return (
              <Scenario key={index}>
                <ScenarioShareTitle>
                  {tradeTypeValue === "long" ? "-" : "+"}
                  {risk}% change
                </ScenarioShareTitle>
                <ScenarioSharePrice>
                  Risk Point: {calculateRiskPoint(risk)}
                </ScenarioSharePrice>
                <ScenarioTotalShares>
                  # of Shares {calculateNumberOfShares(risk)}
                </ScenarioTotalShares>
                <ScenarioPositionSize>
                  Position Size:
                  {calculatePositionSizeValue(risk)} (
                  {calculatePositionSizePercentage(risk)}
                  %)
                </ScenarioPositionSize>
              </Scenario>
            );
          })}
        </RiskScenarioWrapper>
      </Summary>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.h1`
  font-size: 2.5rem;
`;

const TradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 64px;
`;

const Label = styled.label`
  display: flex;
  gap: 12px;
`;

const PortfolioSizeLabel = styled(Label)`
  margin-bottom: 64px;
`;

const Input = styled.input``;
const RadioInput = styled.input``;

const TradeTypeWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Summary = styled.div``;

const RiskSummaryWrapper = styled.div``;
const RiskSummaryTitle = styled.h2``;
const RiskSummaryValue = styled.h3``;

const RiskScenarioWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;
const Scenario = styled.div``;
const ScenarioShareTitle = styled.h2``;
const ScenarioSharePrice = styled.h3``;
const ScenarioTotalShares = styled.h3``;
const ScenarioPositionSize = styled.h3``;

export default PositionSizeCalculator;
