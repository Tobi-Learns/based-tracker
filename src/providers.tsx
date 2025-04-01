"use client";

import type { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains";
import imgurl from "/src/assets/yatokami.jpg";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={import.meta.env.VITE_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base} // add baseSepolia for testing
      config={{
        appearance: {
          name: "Based-Tracker", // Displayed in modal header
          logo: imgurl,
          mode: "auto", // 'auto' | 'light' | 'dark'
          theme: "custom", // 'default' | 'base' | 'cyberpunk' | 'hacker' //
        },
        wallet: {
          display: "modal",
          termsUrl: "https://...",
          privacyUrl: "https://...",
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
