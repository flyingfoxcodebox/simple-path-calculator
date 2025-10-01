import { useState, useEffect } from "react";
import { InputForm } from "./components/InputForm";
import { ProjectionResults } from "./components/ProjectionResults";
import { AugieMessage } from "./components/AugieMessage";
import { JLCollinsQuote } from "./components/JLCollinsQuote";
import { calculateVTSAXProjections } from "./utils/finance";
import { getVTSAXData } from "./utils/vanguardData";

interface AppState {
  amount: number | null;
  projections: any | null;
  vtsaxData: any | null;
  isLoading: boolean;
  error: string | null;
}

function App() {
  const [state, setState] = useState<AppState>({
    amount: null,
    projections: null,
    vtsaxData: null,
    isLoading: false,
    error: null,
  });

  // Load VTSAX data on component mount
  useEffect(() => {
    loadVTSAXData();
  }, []);

  const loadVTSAXData = async () => {
    try {
      const data = await getVTSAXData();
      setState((prev) => ({ ...prev, vtsaxData: data }));
    } catch (error) {
      console.error("Failed to load VTSAX data:", error);
      setState((prev) => ({
        ...prev,
        error: "Failed to load VTSAX data. Using fallback values.",
      }));
    }
  };

  const handleCalculate = async (amount: number) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Use cached VTSAX data or fallback
      const tenYearReturn = state.vtsaxData?.tenYearReturn || 0.1; // 10% fallback

      const projections = calculateVTSAXProjections(amount, tenYearReturn);

      setState((prev) => ({
        ...prev,
        amount,
        projections,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Calculation error:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to calculate projections. Please try again.",
      }));
    }
  };

  const handleReset = () => {
    setState({
      amount: null,
      projections: null,
      vtsaxData: state.vtsaxData, // Keep VTSAX data
      isLoading: false,
      error: null,
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐕 Simple Path Calculator</h1>
        <p className="app-subtitle">
          Augie's Investment Advice: Because your dog knows what's really
          important!
        </p>
      </header>

      <main className="app-main">
        {state.error && (
          <div className="error-banner">
            <span>⚠️ {state.error}</span>
          </div>
        )}

        {!state.amount ? (
          <InputForm onSubmit={handleCalculate} isLoading={state.isLoading} />
        ) : (
          <div className="results-container">
            <ProjectionResults
              projections={state.projections}
              originalAmount={state.amount}
              isLoading={state.isLoading}
            />

            <AugieMessage
              amount={state.amount}
              optimisticAmount={state.projections?.optimistic}
              isLoading={state.isLoading}
            />

            <JLCollinsQuote amount={state.amount} />

            <div className="action-buttons">
              <button onClick={handleReset} className="reset-button">
                Calculate Another Amount
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>
            💡 <strong>Remember:</strong> This calculator is for educational
            purposes only. Past performance does not guarantee future results.
            Consider consulting a financial advisor before making investment
            decisions.
          </p>

          {state.vtsaxData && (
            <p className="data-source">
              📊 VTSAX data source: {state.vtsaxData.source}
              (Last updated:{" "}
              {new Date(state.vtsaxData.lastUpdated).toLocaleDateString()})
            </p>
          )}

          <p className="copyright">
            Made with ❤️ for Augie and smart financial decisions
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
