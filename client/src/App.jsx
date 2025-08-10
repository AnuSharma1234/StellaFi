import "./App.css";
import { WalletProvider } from "./provider/key.provider";
import ErrorBoundary from "./components/ErrorBoundary";
import Routes from "./routes";

function App() {
  return (
    <ErrorBoundary>
      <WalletProvider>
        <Routes/>
      </WalletProvider>
    </ErrorBoundary>
  );
}

export default App;
