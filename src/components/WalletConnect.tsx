import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div>
      <ConnectButton />
      {isConnected && (
        <div>
          <p>Wallet Address: {address}</p>
          <p>Balance: {balance?.formatted} ETH</p>
        </div>
      )}
    </div>
  );
}
