"use client";

import "@getpara/react-sdk/styles.css";
import { QueryProvider } from "./context/QueryProvider";
import { ParaProvider } from "./context/ParaProvider";

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ParaProvider>{children}</ParaProvider>
    </QueryProvider>
  );
}
