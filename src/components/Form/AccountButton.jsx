"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./Button";

const AccountButton = ({ size = "sm", className = "" }) => {

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
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
                return null;
              }

              if (chain.unsupported) {
                return null;
              }

              return (
                <Button
                  size={size}
                  type="default"
                  onClick={openAccountModal}
                  className={className}
                >
                  {account.displayName}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default AccountButton;
