import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";

import Layout from "@/components/Layout/Layout";
import useInput from "@hooks/useInput.hook";

import { formatNumberWithCommas } from "@utils/index";
import { calculatePortfolioAtRisk } from "@/utils/trading";

const RiskCalculator: NextPage = () => {
  const portfolioSizeInput = useInput(63000);
  const entryPriceInput = useInput("");
  const exitPriceInput = useInput("");
  const positionSizeInput = useInput(1);
  const [portfolioAtRisk, setPortfolioAtRisk] = useState(0);
  const [portfolioAtRiskPercentage, setPortfolioAtRiskPercentage] = useState(0);

  useEffect(() => {
    const calculatePortfolioRisk = () => {
      const inputs = {
        entryPrice: parseFloat(entryPriceInput.value),
        exitPrice: parseFloat(exitPriceInput.value),
        portfolioSize: parseFloat(portfolioSizeInput.value),
        positionSize: parseFloat(positionSizeInput.value)
      };

      const result = calculatePortfolioAtRisk(inputs);
      setPortfolioAtRisk(result.value);
      setPortfolioAtRiskPercentage(result.percent);
    };

    calculatePortfolioRisk(); // Initial calculation

    // Call calculatePortfolioRisk whenever input values change
    const debouncedCalculatePortfolioRisk = setTimeout(
      calculatePortfolioRisk,
      300
    );
    return () => clearTimeout(debouncedCalculatePortfolioRisk);
  }, [
    entryPriceInput.value,
    exitPriceInput.value,
    portfolioSizeInput.value,
    positionSizeInput.value
  ]);

  return (
    <Layout>
      <Title>Risk Calculator</Title>
      <PortfolioSizeLabel>
        <LabelText>Portfolio Size</LabelText>
        <Input {...portfolioSizeInput} placeholder="63000" />
      </PortfolioSizeLabel>
      <TradeWrapper>
        <Label>
          <LabelText>Position Size</LabelText>
          <PercentInput {...positionSizeInput} placeholder="0" />
        </Label>
        <Label>
          <LabelText>Entry Price</LabelText>
          <Input {...entryPriceInput} placeholder="0.00" />
        </Label>
        <Label>
          <LabelText>Exit Price</LabelText>
          <Input {...exitPriceInput} placeholder="0.00" />
        </Label>
      </TradeWrapper>

      <Summary>
        <SummaryText>
          Portfolio at Risk: <br />
          {Number.isNaN(portfolioAtRisk) ? (
            "waiting to calculate"
          ) : (
            <div>
              {portfolioAtRiskPercentage}% ($
              {formatNumberWithCommas(portfolioAtRisk)})
            </div>
          )}
        </SummaryText>
      </Summary>
    </Layout>
  );
};

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: var(--space-xl);
`;

const TradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 48px 0;
`;

const Label = styled.label`
  display: flex;
  gap: 12px;
`;

const PortfolioSizeLabel = styled(Label)`
  margin-bottom: 8px;
`;

const Input = styled.input``;
const PercentInput = styled.input`
  position: relative;
  ::after {
    content: "%";
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--white);
  }
`;

const LabelText = styled.span`
  min-width: 150px;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
const SummaryText = styled.span``;

export default RiskCalculator;
