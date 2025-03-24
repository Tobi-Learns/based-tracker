import "./Dashboard.css";
import { useAccount, useBalance } from "wagmi";

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
  const { data: balanceData } = useBalance({
    address,
  });

  const ethBalance = balanceData ? parseFloat(balanceData.formatted) : 0;

  const assets: Asset[] = [
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: ethBalance ?? 0,
      change24h: 7.27,
      price: 1862.26,
      total: ethBalance ? ethBalance * 1862.26 : 0,
      avgBuy: 0.2819,
      profitLoss: 36.23,
      profitLossPercent: 19.35,
      logo: "./src/assets/ethlogo.png",
    },
  ];

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
            <span className="positive-change">▲ {asset.change24h}%</span>
            <span>${asset.price.toLocaleString()}</span>
            <span>${asset.total.toFixed(2)}</span>
            <span>${asset.avgBuy.toFixed(4)}</span>
            <div className="profit-loss">
              <span>${asset.profitLoss.toFixed(2)}</span>
              <span className="positive-change">
                ▲ {asset.profitLossPercent}%
              </span>
            </div>
            <span className="menu-icon">⋮</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
