"use client";

import "@getpara/react-sdk/styles.css";
import { QueryProvider } from "./context/QueryProvider";
import { WagmiProvider } from "./context/WagmiProvider";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WagmiProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </WagmiProvider>
  );
}
