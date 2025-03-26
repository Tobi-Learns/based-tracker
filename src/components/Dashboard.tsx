import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getPortfolios } from "@coinbase/onchainkit/api";

interface Asset {
  name: string;
  symbol: string;
  amount: number;
  change24h: number;
  price: number;
  total: number;
  avgBuy: number;
  profitLoss: number;
  profitLossPercent: number;
  logo: string;
}

const Dashboard = () => {
  const { address } = useAccount();
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
        if (!address) return;
      
        try {
          const response = await getPortfolios({ addresses: [address] });
      
          if ("error" in response) {
            console.error("API error:", response.error);
            return;
          }
      
          console.log("Portfolio response:", response); // ← helps a lot
      
          const tokens = response.portfolios?.[0]?.tokenBalances || [];
      
          const formattedAssets: Asset[] = tokens
            .filter(token => token.cryptoBalance && token.decimals != null)
            .map((token) => {
              const amount = Number(token.cryptoBalance) / Math.pow(10, token.decimals);
              const price = amount === 0 ? 0 : Number(token.fiatBalance) / amount;
      
              return {
                name: token.name,
                symbol: token.symbol,
                amount,
                price,
                total: Number(token.fiatBalance),
                change24h: 0,
                avgBuy: 0,
                profitLoss: 0,
                profitLossPercent: 0,
                logo: token.image || "/default.png",
              };
            });
      
          setAssets(formattedAssets);
        } catch (err) {
          console.error("Unexpected error:", err);
        }
      };

    fetchPortfolio();
  }, [address]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="asset-table">
        <div className="table-header">
          <span className="header-name">Name</span>
          <span>Amount</span>
          <span>24h Change</span>
          <span>Price</span>
          <span>Total</span>
          <span>Avg Buy</span>
          <span>P/L</span>
          <span className="menu-icon">☰</span>
        </div>

        {assets.map((asset, index) => (
          <div className="table-row" key={index}>
            <div className="asset-info">
              <img src={asset.logo} alt={asset.name} className="asset-logo" />
              <span className="asset-name">
                <strong>{asset.name}</strong> • {asset.symbol}
              </span>
            </div>
            <span>{asset.amount.toFixed(5)}</span>
            <span className="neutral-change">—</span>
            <span>${asset.price.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
            <span>${asset.total.toFixed(2)}</span>
            <span>${asset.avgBuy.toFixed(4)}</span>
            <div className="profit-loss">
              <span>${asset.profitLoss.toFixed(2)}</span>
              <span className="neutral-change">—</span>
            </div>
            <span className="menu-icon">⋮</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
