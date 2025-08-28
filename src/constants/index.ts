"use client";

import { mainnet } from "wagmi/chains";
import type { Chain } from "wagmi/chains";
import { Environment } from "@getpara/react-sdk";

export const ENVIRONMENT =
  process.env.NODE_ENV === "development" ? Environment.BETA : Environment.PROD;
export const API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY;
export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!API_KEY || API_KEY === "") {
  throw new Error(
    "API key is not defined. Please set NEXT_PUBLIC_PARA_API_KEY in your environment variables."
  );
}

if (!WALLET_CONNECT_PROJECT_ID || WALLET_CONNECT_PROJECT_ID === "") {
  throw new Error(
    "Wallet Connect project ID is not defined. Please set NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID in your environment variables."
  );
}

// Define Camp Network chains
export const campNetwork: Chain & { iconUrl?: string } = {
  id: 484,
  name: "Camp Network",
  nativeCurrency: { name: "CAMP", symbol: "CAMP", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.camp.raas.gelato.cloud"] },
  },
  blockExplorers: {
    default: {
      name: "Camp Explorer",
      url: "https://camp.cloud.blockscout.com",
    },
  },
  iconUrl: "/camp-token.svg",
};

// Define supported chains
export const supportedChains = [
  campNetwork, // Camp Network (first - mainnet)
  mainnet, // Ethereum Mainnet
] as const;
