import React, { useState, useEffect } from "react";
import { getJLCollinsQuoteByAmount } from "../utils/jlCollinsQuotes";

interface JLCollinsQuoteProps {
  amount: number;
}

export const JLCollinsQuote: React.FC<JLCollinsQuoteProps> = ({ amount }) => {
  const [quote, setQuote] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (amount > 0) {
      // Generate a new quote based on the amount
      const newQuote = getJLCollinsQuoteByAmount(amount);
      setQuote(newQuote);

      // Show with a slight delay for dramatic effect
      setTimeout(() => {
        setIsVisible(true);
      }, 800);
    } else {
      setIsVisible(false);
    }
  }, [amount]);

  const handleSwipe = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsVisible(false);

    setTimeout(() => {
      // Generate a new random quote
      const newQuote = getJLCollinsQuoteByAmount(amount + Math.random() * 1000);
      setQuote(newQuote);
      setIsVisible(true);
      setIsAnimating(false);
    }, 300);
  };

  if (!quote || amount <= 0) {
    return null;
  }

  return (
    <div
      className={`jl-collins-quote ${isVisible ? "show" : ""} ${
        isAnimating ? "animating" : ""
      }`}
      onClick={handleSwipe}
      title="Click or swipe for another quote"
    >
      <div className="quote-header">
        <h4>💡 Wisdom from JL Collins</h4>
        <p className="quote-author">Author of "The Simple Path to Wealth"</p>
        <p className="quote-hint">👆 Click for another quote</p>
      </div>
      <blockquote className="quote-text">"{quote}"</blockquote>
      <div className="quote-footer">
        <p className="quote-source">
          💰 Remember: The market rewards patience and consistency
        </p>
      </div>
    </div>
  );
};
