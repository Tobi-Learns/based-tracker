import "@coinbase/onchainkit/styles.css";
import "./App.css";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
// import { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
// import TokenTable from "./components/TokenTable";
 
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

/* import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";
import WalletComponents from "./components/WalletComponents";
import dotenv from "dotenv";

dotenv.config();

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "onchainkit",
    }),
  ],
  ssr: true,
  transports: {
    // [baseSepolia.id]: http(process.env.BASE_SEPOLIA_API_URL),
    [baseSepolia.id]: http("9281ef6b-b778-47ec-baa1-eb063153bab6"),
  },
});

function App({ children }: { children: ReactNode }) {
  return (
    <div>
      <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>;
      <div>
        <WalletComponents />
      </div>
    </div>
  );
}

export default App;
 */
