import React from "react";
import { InvestmentProjection, formatCurrency } from "../utils/finance";

interface ProjectionResultsProps {
  projections: InvestmentProjection;
  originalAmount: number;
  isLoading?: boolean;
}

export const ProjectionResults: React.FC<ProjectionResultsProps> = ({
  projections,
  originalAmount,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="projection-results loading">
        <h3>📊 Calculating Your Investment Potential...</h3>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Fetching latest VTSAX data and running calculations</p>
        </div>
      </div>
    );
  }

  const conservativeGain = projections.conservative - originalAmount;
  const optimisticGain = projections.optimistic - originalAmount;
  const conservativeMultiplier = projections.conservative / originalAmount;
  const optimisticMultiplier = projections.optimistic / originalAmount;

  return (
    <div className="projection-results">
      <h3>📊 Your Investment Projection</h3>
      <p className="projection-subtitle">
        If you invested <strong>{formatCurrency(originalAmount)}</strong> in
        VTSAX for {projections.years} years:
      </p>

      <div className="projection-cards">
        <div className="projection-card conservative">
          <div className="card-header">
            <span className="projection-type">🛡️ Conservative</span>
            <span className="projection-note">
              (
              {(
                ((projections.conservative / originalAmount) **
                  (1 / projections.years) -
                  1) *
                100
              ).toFixed(1)}
              % annually)
            </span>
          </div>
          <div className="projection-amount">
            {formatCurrency(projections.conservative)}
          </div>
          <div className="projection-details">
            <div className="gain">
              <span className="gain-label">Gain:</span>
              <span className="gain-amount positive">
                +{formatCurrency(conservativeGain)}
              </span>
            </div>
            <div className="multiplier">
              <span className="multiplier-label">Growth:</span>
              <span className="multiplier-amount">
                {conservativeMultiplier.toFixed(1)}x
              </span>
            </div>
          </div>
        </div>

        <div className="projection-card optimistic">
          <div className="card-header">
            <span className="projection-type">🚀 Optimistic</span>
            <span className="projection-note">
              (
              {(
                ((projections.optimistic / originalAmount) **
                  (1 / projections.years) -
                  1) *
                100
              ).toFixed(1)}
              % annually)
            </span>
          </div>
          <div className="projection-amount">
            {formatCurrency(projections.optimistic)}
          </div>
          <div className="projection-details">
            <div className="gain">
              <span className="gain-label">Gain:</span>
              <span className="gain-amount positive">
                +{formatCurrency(optimisticGain)}
              </span>
            </div>
            <div className="multiplier">
              <span className="multiplier-label">Growth:</span>
              <span className="multiplier-amount">
                {optimisticMultiplier.toFixed(1)}x
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="projection-summary">
        <h4>💡 Key Insights</h4>
        <ul>
          <li>
            Your money could grow to{" "}
            <strong>{formatCurrency(projections.conservative)}</strong> to{" "}
            <strong>{formatCurrency(projections.optimistic)}</strong>
          </li>
          <li>
            That's a potential gain of{" "}
            <strong>{formatCurrency(conservativeGain)}</strong> to{" "}
            <strong>{formatCurrency(optimisticGain)}</strong>
          </li>
          <li>
            Your investment could multiply by{" "}
            <strong>{conservativeMultiplier.toFixed(1)}x</strong> to{" "}
            <strong>{optimisticMultiplier.toFixed(1)}x</strong>
          </li>
        </ul>
      </div>

      <div className="vanguard-link-container">
        <a
          href="https://investor.vanguard.com/investment-products/mutual-funds/profile/vtsax"
          target="_blank"
          rel="noopener noreferrer"
          className="vanguard-data-link"
        >
          📊 View Official VTSAX Performance Data
        </a>
      </div>

      <div className="disclaimer">
        <p>
          ⚠️ <strong>Disclaimer:</strong> Past performance does not guarantee
          future results. These projections are based on historical VTSAX
          performance and are for educational purposes only. Consider consulting
          a financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
};
