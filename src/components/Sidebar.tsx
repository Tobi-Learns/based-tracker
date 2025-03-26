// import Connect from "./Connect";
import "./Sidebar.css";
// import UseWallet from "../hooks/useWallet";
import WalletComponents from "./WalletComponents"

const Sidebar = () => {
  // const { account } = useWallet();

  return (
    <aside className="sidebar">
      <div className="wallet-section">
        <WalletComponents />
      </div>

      <ul className="sidebar-links">
        {[
          { label: "Dashboard", icon: "📊" },
          { label: "Assets", icon: "📈" },
          { label: "Analytics", icon: "📉" },
          { label: "DeFi Yields", icon: "💰" },
          { label: "Swap", icon: "🔄" },
        ].map((item, index) => (
          <li key={index}>
            <a href="#">
              <span className="icon">{item.icon}</span> {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
