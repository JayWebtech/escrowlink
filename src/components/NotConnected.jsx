import React from "react";
import ConnectWalletButton from "./Form/ConnectWalletButton";
import Link from "next/link";

const NotConnected = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center text-white">
        Initiate Escrow
      </h1>
      <p className="text-white my-5">Please connect your wallet to continue</p>
      <ConnectWalletButton />
    </div>
  );
};

export default NotConnected;
