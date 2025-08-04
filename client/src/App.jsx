import "./App.css";
import { WalletProvider } from "./provider/key.provider";
import Routes from "./routes";

function App() {
  return (
    <WalletProvider>
        <Routes/>
    </WalletProvider>
  );
}

export default App;
