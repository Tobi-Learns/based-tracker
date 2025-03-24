import { WalletDefault } from "@coinbase/onchainkit/wallet";
import { useAccount, useBalance } from "wagmi";

interface Asset {
  amount: any;
}

function UseWallet() {
  const { address, isConnected } = useAccount();
  const { data: balanceData, isLoading } = useBalance({
    address,
  });

  const amount: Asset[] = [{ amount: balanceData?.formatted }];

  console.log(amount);

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

export default UseWallet;
