import "@coinbase/onchainkit/styles.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "onchainkit",
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(import.meta.env.BASE_SEPOLIA_API_URL),
  },
});

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <div>
        <NavBar />
      </div>

      <div className="container">
        <Sidebar />
        <Dashboard />
      </div>
    </WagmiProvider>
  );
}

export default App;
