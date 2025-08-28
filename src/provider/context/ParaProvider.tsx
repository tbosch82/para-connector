"use client";

import { ParaProvider as Provider } from "@getpara/react-sdk";
import { mainnet } from "wagmi/chains";
import { cookieStorage, createStorage, http } from "wagmi";
import { API_KEY, campNetwork, ENVIRONMENT } from "@/constants";

export function ParaProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider
      paraClientConfig={{
        apiKey: API_KEY || "",
        env: ENVIRONMENT,
      }}
      externalWalletConfig={{
        wallets: ["METAMASK", "OKX", "WALLETCONNECT"],
        evmConnector: {
          config: {
            chains: [campNetwork, mainnet],
            transports: {
              [campNetwork.id]: http("https://rpc.camp.raas.gelato.cloud"), // Camp Network
              [mainnet.id]: http(), // Ethereum Mainnet
            },
            storage: createStorage({
              storage: cookieStorage,
            }),
            ssr: true,
          },
        },
        walletConnect: {
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "",
        },
      }}
      config={{ appName: "YOUR APP NAME!!!" }}
      paraModalConfig={{
        // CHANGE THIS CONFIG AS NEEDED
        disableEmailLogin: false,
        disablePhoneLogin: false,
        authLayout: ["AUTH:FULL", "EXTERNAL:FULL"],
        oAuthMethods: [
          "APPLE",
          "DISCORD",
          "FACEBOOK",
          "FARCASTER",
          "GOOGLE",
          "TWITTER",
        ],
        onRampTestMode: true,
        theme: {
          foregroundColor: "#222222",
          backgroundColor: "#FFFFFF",
          accentColor: "#888888",
          darkForegroundColor: "#EEEEEE",
          darkBackgroundColor: "#111111",
          darkAccentColor: "#AAAAAA",
          mode: "light",
          borderRadius: "none",
          font: "Inter",
        },
        logo: "/para.svg",
        recoverySecretStepEnabled: true,
        twoFactorAuthEnabled: false,
      }}
    >
      {children}
    </Provider>
  );
}
