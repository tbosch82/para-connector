"use client";

import { PropsWithChildren } from "react";
import { wagmiConfig } from "@/constants";
import { WagmiProvider as Provider } from "wagmi";

export const WagmiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider config={wagmiConfig}>{children}</Provider>;
};
