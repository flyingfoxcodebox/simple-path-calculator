/**
 * JL Collins quotes utility for investment inspiration
 */

// Curated JL Collins quotes from "The Simple Path to Wealth"
const JL_COLLINS_QUOTES = [
  "Take out your sharpest knife and cut up your credit cards.",
  "The stock market is a giant distraction to the business of investing.",
  "The only reason to own bonds is to dampen volatility, not to increase returns.",
  "The market is going to do what it's going to do. Your job is to stay invested and let it work for you.",
  "The most important thing about an investment philosophy is that you have one.",
  "The goal of investing is not to outperform the market. It's to outperform inflation.",
  "When you own the entire stock market through an index fund, you own everything.",
  "The stock market is the greatest wealth-building tool ever invented.",
  "The market doesn't care what you think. It's going to do what it's going to do.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "You don't need to beat the market. You just need to be in the market.",
  "The market is a voting machine in the short term, but a weighing machine in the long term.",
  "The enemy of a good plan is the dream of a perfect plan.",
  "The stock market is a device for transferring money from the impatient to the patient.",
  "Investing is simple, but not easy.",
  "The market will fluctuate, but over time it will go up.",
  "You can't time the market, but you can be in the market.",
  "The best investment you can make is in yourself.",
  "The market is a servant, not a master.",
  "Your money should work for you, not the other way around.",
  "The most powerful force in the universe is compound interest.",
  "Time in the market beats timing the market.",
  "The market doesn't know you exist, and it doesn't care.",
  "Your biggest enemy as an investor is yourself.",
  "The market is efficient, but it's not perfect.",
  "The best investment strategy is the one you can stick with.",
  "The market is a discounting mechanism.",
  "Your investment returns will be determined by your behavior, not your knowledge.",
  "The market is a place where patience is rewarded and impatience is punished.",
  "The best time to start investing was yesterday. The second best time is today.",
];

/**
 * Get a random JL Collins quote
 * @returns A random quote from JL Collins
 */
export function getRandomJLCollinsQuote(): string {
  const randomIndex = Math.floor(Math.random() * JL_COLLINS_QUOTES.length);
  return JL_COLLINS_QUOTES[randomIndex];
}

/**
 * Get a JL Collins quote based on a seed (for consistent quotes per session)
 * @param seed - A number to use as seed for quote selection
 * @returns A JL Collins quote
 */
export function getJLCollinsQuoteBySeed(seed: number): string {
  const index = Math.abs(seed) % JL_COLLINS_QUOTES.length;
  return JL_COLLINS_QUOTES[index];
}

/**
 * Get a JL Collins quote based on the current date (changes daily)
 * @returns A JL Collins quote for today
 */
export function getDailyJLCollinsQuote(): string {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return getJLCollinsQuoteBySeed(dayOfYear);
}

/**
 * Get a JL Collins quote based on the calculation amount (for variety)
 * @param amount - The investment amount
 * @returns A JL Collins quote
 */
export function getJLCollinsQuoteByAmount(amount: number): string {
  const seed = Math.floor(amount / 100) + (Date.now() % 1000);
  return getJLCollinsQuoteBySeed(seed);
}
