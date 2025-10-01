# 🐕 Simple Path Calculator - Augie's Investment Advice

A fun and educational web application that helps you understand the power of compound interest by showing how much money you could earn by investing in VTSAX instead of buying that impulse purchase. Featuring Augie's sassy commentary and Chewy product suggestions!

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-blue)](https://your-app-url.vercel.app)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF.svg)](https://vitejs.dev/)

## 🎯 Demo

Try the calculator with different amounts to see Augie's investment advice in action:

- **$100** → See how it could grow to $259 (conservative) or $285 (optimistic)
- **$500** → Watch Augie suggest treats you could buy with the future value
- **$1,000** → Get inspired by JL Collins quotes about long-term investing

## ✨ Features

- **Investment Calculator**: Calculate 10-year projections for VTSAX investments with conservative and optimistic scenarios
- **Real VTSAX Data**: Fetches current 10-year average returns from Vanguard (with fallback)
- **Augie's Commentary**: Dynamic messages from Augie suggesting what treats/toys you could buy instead
- **Chewy Integration**: Shows real pet products you could purchase with the same amount
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Edge Case Handling**: Graceful handling of API failures, validation errors, and zero-item scenarios

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:

   ```bash
   cd simple-path-calculator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

```
simple-path-calculator/
├── src/
│   ├── components/
│   │   ├── InputForm.tsx          # User input form for amount
│   │   ├── ProjectionResults.tsx  # Investment projection display
│   │   └── AugieMessage.tsx       # Augie's commentary and product suggestions
│   ├── utils/
│   │   ├── finance.ts             # Compound interest calculations
│   │   ├── vanguardData.ts        # VTSAX data fetching
│   │   └── chewyApi.ts            # Chewy product data (mock implementation)
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── package.json
├── vite.config.ts
└── README.md
```

## 🔧 Configuration

### VTSAX Data Source

The application attempts to fetch real VTSAX data but includes fallback values. To use real data:

1. **Option 1: Financial API**

   - Sign up for Alpha Vantage or similar financial data API
   - Add your API key to environment variables:
     ```bash
     REACT_APP_FINANCIAL_API_KEY=your_api_key_here
     ```

2. **Option 2: Custom Backend**
   - Create a backend service to scrape Vanguard data
   - Update the `fetchVTSAXData()` function in `src/utils/vanguardData.ts`

### Chewy Product Data

Currently uses mock data. To integrate with real Chewy products:

1. **Option 1: Chewy Affiliate API**

   - Apply for Chewy's affiliate program
   - Update `src/utils/chewyApi.ts` with real API calls

2. **Option 2: Pet Product API**
   - Use a pet product aggregator API
   - Update the `fetchFromPetProductAPI()` function

## 🎨 Customization

### Adding Augie's Photo

1. Place Augie's photo in the `public/` directory
2. Update the `AugieMessage.tsx` component:
   ```tsx
   <img src="/augie-photo.jpg" alt="Augie" className="augie-photo" />
   ```

### Styling

The application uses CSS custom properties for easy theming. Key variables in `src/index.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #38a169;
  --error-color: #e53e3e;
  --text-color: #2d3748;
  --background-color: #f7fafc;
}
```

## 🧮 How It Works

### Investment Calculation

The app uses the compound interest formula:

```
FV = P × (1 + r)^t
```

Where:

- `FV` = Future Value
- `P` = Principal (initial investment)
- `r` = Annual return rate
- `t` = Time period (10 years)

### Projection Scenarios

- **Conservative**: VTSAX 10-year return - 1%
- **Optimistic**: VTSAX 10-year return + 1%

### Augie's Logic

1. Fetches affordable pet products within the user's budget
2. Calculates how many items can be purchased
3. Displays sassy message with product suggestions
4. Shows special message for amounts too small to buy anything

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Style

The project follows React best practices:

- Functional components with hooks
- TypeScript for type safety
- Modular component structure
- Comprehensive error handling

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test them locally
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to your branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Setup
```bash
git clone https://github.com/your-username/simple-path-calculator.git
cd simple-path-calculator
npm install
npm run dev
```

### Ideas for Contributions
- 🐕 Add more Augie photos or animations
- 📊 Integrate real-time VTSAX data from APIs
- 🛒 Add more pet product categories
- 💡 Include more JL Collins quotes
- 📱 Improve mobile responsiveness
- 🎨 Enhance the UI/UX design

## ⚠️ Disclaimer

This application is for educational purposes only. Past performance does not guarantee future results. Always consult with a qualified financial advisor before making investment decisions.

## 🐕 About Augie

Augie is the star of this application, providing witty commentary and practical advice about spending money on things that really matter - like treats and toys for good dogs!

---

Made with ❤️ for Augie and smart financial decisions
