import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";

import Layout from "@/components/Layout/Layout";
import useInput from "@hooks/useInput.hook";
import { formatNumberWithCommas } from "@utils/index";

import { calculateSharesToBuy } from "@/utils/trading";

const SharesToBuyCalculator: NextPage = () => {
  const portfolioSizeInput = useInput(63000);
  const entryPriceInput = useInput("");
  const exitPriceInput = useInput("");
  const riskPercentageInput = useInput(1);
  const [sharesToBuy, setSharesToBuy] = useState(0);

  useEffect(() => {
    const calculateShares = () => {
      const inputs = {
        entryPrice: parseFloat(entryPriceInput.value),
        exitPrice: parseFloat(exitPriceInput.value),
        portfolioSize: parseFloat(portfolioSizeInput.value),
        riskPercentage: parseFloat(riskPercentageInput.value)
      };

      const result = calculateSharesToBuy(inputs);
      setSharesToBuy(result);
    };

    calculateShares(); // Initial calculation

    // Call calculateShares whenever input values change
    const debouncedCalculateShares = setTimeout(calculateShares, 300);
    return () => clearTimeout(debouncedCalculateShares);
  }, [
    entryPriceInput.value,
    exitPriceInput.value,
    portfolioSizeInput.value,
    riskPercentageInput.value
  ]);

  const calculateSharesToBuyValue = () => {
    return formatNumberWithCommas(
      (sharesToBuy * parseFloat(entryPriceInput.value)).toFixed(2)
    );
  };

  const calculatePortfolioRiskValue = () => {
    return (
      (parseFloat(portfolioSizeInput.value) *
        parseFloat(riskPercentageInput.value)) /
      100
    );
  };

  return (
    <Layout>
      <Title>Risk Calculator</Title>
      <PortfolioSizeLabel>
        <LabelText>Portfolio Size</LabelText>
        <Input {...portfolioSizeInput} placeholder="63000" />
      </PortfolioSizeLabel>
      <Label>
        <LabelText>% Risk</LabelText>
        <PercentInput {...riskPercentageInput} placeholder="0" />
        <RiskValue>
          Amount at Risk: $
          <span style={{ fontWeight: 600 }}>
            {formatNumberWithCommas(calculatePortfolioRiskValue())}
          </span>
        </RiskValue>
      </Label>
      <TradeWrapper>
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
          Number of shares to buy : <br />
          {Number.isNaN(sharesToBuy) ? (
            "none"
          ) : (
            <div>
              {sharesToBuy} (${calculateSharesToBuyValue()})
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
  flex-wrap: wrap;
  gap: 12px;
`;

const PortfolioSizeLabel = styled(Label)`
  margin-bottom: 8px;
`;

const RiskValue = styled.span`
  flex-basis: 100%;
`;

const Input = styled.input`
  max-width: 50%;
`;
const PercentInput = styled.input`
  max-width: 50%;
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

export default SharesToBuyCalculator;
