"use client";

import type { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "wagmi/chains"; // add baseSepolia for testing

export default function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={import.meta.env.VITE_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base} // add baseSepolia for testing
      config={{
        appearance: {
          mode: "auto", // 'auto' | 'light' | 'dark'
          theme: "custom", // 'default' | 'base' | 'cyberpunk' | 'hacker' //
        },
      }}
    >
      {props.children}
    </OnchainKitProvider>
  );
}
