"use client";

import {
  useModal,
  useWallet,
  useAccount,
  useWalletState,
} from "@getpara/react-sdk";
import { useEffect } from "react";
import { ArrowIcon } from "@/icons/arrow-icon";
import { StyledButton } from "@/components/common/styledButton";

export default function WalletConnectButton({
  WalletConnectName = "Connect Wallet",
}: {
  WalletConnectName?: string;
}) {
  const { openModal } = useModal();
  const { data: wallet } = useWallet();
  const { isConnected } = useAccount();
  const { setSelectedWallet } = useWalletState();

  useEffect(() => {
    if (isConnected && wallet?.type !== "EVM") {
      setSelectedWallet({ id: "default", type: "EVM" });
    }
  }, [isConnected, wallet, setSelectedWallet]);

  const handleClick = () => {
    openModal();
  };

  if (!wallet?.address || !isConnected) {
    return (
      <StyledButton onClick={handleClick} className="uppercase">
        {WalletConnectName}
        <ArrowIcon />
      </StyledButton>
    );
  }

  const truncatedAddress = `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;

  return <StyledButton onClick={handleClick}>{truncatedAddress}</StyledButton>;
}
