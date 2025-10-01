import React, { useState } from "react";

interface InputFormProps {
  onSubmit: (amount: number) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clean the amount string before parsing
    const cleanAmount = amount.replace(/[$,]/g, "");
    const numAmount = parseFloat(cleanAmount);

    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid positive amount");
      return;
    }

    if (numAmount > 1000000) {
      setError(
        "Amount too large. Please enter a reasonable amount under $1,000,000"
      );
      return;
    }

    setError("");
    onSubmit(numAmount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers, decimal point, and dollar sign
    if (value === "" || /^[\d,]*\.?\d*$/.test(value.replace(/[$,]/g, ""))) {
      setAmount(value);
      setError("");
    }
  };

  const formatInputValue = (value: string) => {
    // Remove dollar sign and commas for processing
    const cleanValue = value.replace(/[$,]/g, "");
    const numValue = parseFloat(cleanValue);

    if (isNaN(numValue) || cleanValue === "") return value;

    // Format with commas and dollar sign
    return "$" + numValue.toLocaleString();
  };

  return (
    <div className="input-form-container">
      <h2>💰 Simple Path Calculator</h2>
      <p className="subtitle">
        Enter the cost of something you're thinking about buying, and see how
        much that money could grow if invested in VTSAX instead!
      </p>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-group">
          <label htmlFor="amount">Product Cost:</label>
          <div className="input-wrapper">
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={handleInputChange}
              onBlur={(e) => {
                if (amount && !error) {
                  setAmount(formatInputValue(amount));
                }
              }}
              placeholder="$0.00"
              className={`amount-input ${error ? "error" : ""}`}
              disabled={isLoading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>

        <button
          type="submit"
          className="calculate-button"
          disabled={isLoading || !amount.trim()}
        >
          {isLoading ? "Calculating..." : "Calculate Investment Potential"}
        </button>
      </form>

      <div className="info-box">
        <h3>📈 About VTSAX</h3>
        <p>
          VTSAX (Vanguard Total Stock Market Index Fund) is a low-cost index
          fund that tracks the entire U.S. stock market. It's a popular choice
          for long-term investing due to its diversification and low expense
          ratio.
        </p>

        <div className="vtsax-context">
          <h4>📊 Historical Performance Context</h4>
          <div className="returns-display">
            <div className="return-item">
              <span className="return-label">Conservative:</span>
              <span className="return-value">≈ 8% annually</span>
            </div>
            <div className="return-item">
              <span className="return-label">Optimistic:</span>
              <span className="return-value">≈ 12% annually</span>
            </div>
          </div>
          <p className="context-note">
            Based on historical averages. Past performance does not guarantee
            future results.
          </p>
          <a
            href="https://investor.vanguard.com/investment-products/mutual-funds/profile/vtsax#performance-fees"
            target="_blank"
            rel="noopener noreferrer"
            className="vanguard-link"
          >
            📈 View Official VTSAX Performance Data
          </a>
        </div>
      </div>
    </div>
  );
};
