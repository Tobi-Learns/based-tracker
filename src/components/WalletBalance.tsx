import { useAccount } from "wagmi";
import { createPublicClient, http, formatEther } from "viem";
import { mainnet } from "viem/chains";
import { useEffect, useState } from "react";
import dotenv from "dotenv";
dotenv.config();

const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.BASE_SEPOLIA_API_URL),
});

function WalletBalance() {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address) return;

      try {
        const balanceInWei = await client.getBalance({ address });
        const eth = formatEther(balanceInWei);
        setBalance(eth);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    if (isConnected) {
      fetchBalance();
    }
  }, [address, isConnected]);

  if (!isConnected) return <p>Connect your wallet</p>;

  return <p>Balance: {balance ? `${balance} ETH` : "Loading..."}</p>;
}
export default WalletBalance;
