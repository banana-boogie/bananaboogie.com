interface calculatePortfolioAtRiskPercentageInputs {
  entryPrice: number;
  exitPrice: number;
  portfolioSize: number;
  positionSize: number;
}

interface calculatePortfolioAtRiskResponse {
  value: number;
  percent: number;
}
/**
 * Calculates the total portfolio at risk given the size of the total portfolio,
 * average entry price, exit price, and position size.
 *
 * @param portfolioSize The size of the total portfolio.
 * @param entryPrice The average entry price for the position.
 * @param exitPrice The exit price for the position.
 * @param positionSize The size of the position.
 * @returns The portfolio at risk as a number.
 */
export function calculatePortfolioAtRisk(
  inputs: calculatePortfolioAtRiskPercentageInputs
): calculatePortfolioAtRiskResponse {
  const { portfolioSize, entryPrice, exitPrice, positionSize } = inputs;
  const riskPerShare = entryPrice - exitPrice;

  const portfolioAtRisk = riskPerShare * positionSize;
  return {
    value: portfolioAtRisk,
    percent: parseFloat(((portfolioAtRisk / portfolioSize) * 100).toFixed(2))
  };
}

// calculate value of shares
export function calculateValueOfShares(
  numberOfShares: number,
  pricePerShare: number
): number {
  return numberOfShares * pricePerShare;
}

interface SharesToBuyInputs {
  entryPrice: number;
  exitPrice: number;
  portfolioSize: number;
  riskPercentage: number;
}

/**
 * Calculates the number of shares to buy based on the entry price, exit price, total portfolio size,
 * and the percentage of risk willing to assume.
 *
 * @param entryPrice The price at which you plan to enter the trade.
 * @param exitPrice The expected exit price of the trade.
 * @param portfolioSize The total size of your portfolio.
 * @param riskPercentage The percentage of risk you are willing to assume.
 * @returns The number of shares to buy.
 */
export function calculateSharesToBuy(inputs: SharesToBuyInputs): number {
  const { entryPrice, exitPrice, portfolioSize, riskPercentage } = inputs;

  const riskAmount = portfolioSize * (riskPercentage / 100);
  const potentialLossPerShare = entryPrice - exitPrice;
  const sharesToBuy = Math.floor(riskAmount / potentialLossPerShare);

  return sharesToBuy;
}
