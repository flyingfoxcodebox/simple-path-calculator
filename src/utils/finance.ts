/**
 * Finance utility functions for investment calculations
 */

export interface InvestmentProjection {
  conservative: number;
  optimistic: number;
  years: number;
}

export interface VTSAXData {
  tenYearReturn: number;
  lastUpdated: string;
  source: string;
}

/**
 * Calculate compound growth using the formula: FV = P × (1 + r)^t
 * @param principal - Initial investment amount
 * @param annualRate - Annual return rate (as decimal, e.g., 0.07 for 7%)
 * @param years - Number of years to compound
 * @returns Future value of the investment
 */
export function calculateCompoundGrowth(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0 || annualRate < 0 || years <= 0) {
    return 0;
  }

  return principal * Math.pow(1 + annualRate, years);
}

/**
 * Calculate both conservative and optimistic projections for VTSAX investment
 * @param principal - Initial investment amount
 * @param tenYearReturn - VTSAX 10-year annual return (as decimal)
 * @param years - Number of years to project (default: 10)
 * @returns Investment projections
 */
export function calculateVTSAXProjections(
  principal: number,
  tenYearReturn: number,
  years: number = 10
): InvestmentProjection {
  const conservativeRate = Math.max(0, tenYearReturn - 0.01); // 1% below historical
  const optimisticRate = tenYearReturn + 0.01; // 1% above historical

  return {
    conservative: calculateCompoundGrowth(principal, conservativeRate, years),
    optimistic: calculateCompoundGrowth(principal, optimisticRate, years),
    years,
  };
}

/**
 * Format currency with proper dollar signs and commas
 * @param amount - Amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate how many items can be purchased with a given amount
 * @param budget - Available budget
 * @param itemPrice - Price per item
 * @returns Number of items that can be purchased
 */
export function calculateItemQuantity(
  budget: number,
  itemPrice: number
): number {
  if (budget <= 0 || itemPrice <= 0) {
    return 0;
  }

  return Math.floor(budget / itemPrice);
}
