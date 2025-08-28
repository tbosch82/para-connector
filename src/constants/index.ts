"use client";

import { mainnet } from "wagmi/chains";
import type { Chain } from "wagmi/chains";
import { queryClient } from "@/provider/context/QueryProvider";
import { paraConnector } from "@getpara/wagmi-v2-integration";
import { metaMask, walletConnect } from "wagmi/connectors";
import {
  http,
  createConfig,
  cookieStorage,
  createStorage,
  type CreateConfigParameters,
} from "wagmi";
import { Environment, type TExternalWallet, ParaWeb } from "@getpara/react-sdk";

export const ENVIRONMENT =
  process.env.NODE_ENV === "development" ? Environment.DEV : Environment.PROD;
export const API_KEY = process.env.NEXT_PUBLIC_PARA_API_KEY;
export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const EXTERNAL_WALLETS: TExternalWallet[] = [
  "METAMASK",
  "OKX",
  "WALLETCONNECT",
];

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

const para =
  typeof window !== "undefined"
    ? new ParaWeb(ENVIRONMENT, API_KEY, {
        externalWalletConnectionOnly: true,
      })
    : null;

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

const connector = para
  ? paraConnector({
      appName: "Camp",
      options: {},
      chains: [campNetwork, mainnet],
      para,
      queryClient,
      logo: "/camp-token.png",
      theme: {
        font: "Inter",
        borderRadius: "sm",
        backgroundColor: "#F9F7F4",
        foregroundColor: "#FF6D01",
        accentColor: "#FF5101",
      },
      oAuthMethods: ["GOOGLE", "TWITTER"],
      disablePhoneLogin: true,
      authLayout: ["AUTH:FULL", "EXTERNAL:FULL"],
      recoverySecretStepEnabled: true,
      onRampTestMode: true,
    })
  : null;

const config = {
  chains: [campNetwork, mainnet],
  connectors: [
    ...(connector ? [connector] : []),
    walletConnect({
      projectId: WALLET_CONNECT_PROJECT_ID,
    }),
    metaMask(),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [campNetwork.id]: http("https://rpc.camp.raas.gelato.cloud"), // Camp Network
    [mainnet.id]: http(), // Ethereum Mainnet
  },
} as CreateConfigParameters;

export const wagmiConfig = createConfig(config);
