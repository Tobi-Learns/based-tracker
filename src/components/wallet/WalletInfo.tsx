import { WalletDefault } from "@coinbase/onchainkit/wallet";
import { useAccount, useBalance } from "wagmi";

export default function WalletInfo() {
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading } = useBalance({
    address: `0x${address}`,
    // watch: true, // auto-updates balance
  });

  return (
    <div>
      <WalletDefault />
      {isConnected && (
        <div>
          <p>Connected Address: {address}</p>
          <p>
            Balance:{" "}
            {isLoading
              ? "Loading..."
              : `${balanceData?.formatted} ${balanceData?.symbol}`}
          </p>
        </div>
      )}
    </div>
  );
}
