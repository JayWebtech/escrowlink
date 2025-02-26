"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ConnectWalletButton = ({ size = "sm", className = "" }) => {
  const router = useRouter();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Button
                    size={size}
                    onClick={openConnectModal}
                    type="default"
                    className={`text-black ${className}`}
                  >
                    Connect wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                toast.error("Unsupported network");
                return (
                  <Button
                    size={size}
                    onClick={openChainModal}
                    type="default"
                    className={className}
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <Button
                  size={size}
                  type="default"
                  onClick={() => router.push("/initiate")}
                  className={className}
                >
                  Initiate Escrow
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWalletButton;
