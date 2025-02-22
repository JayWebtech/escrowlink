import React from "react";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 sm:px-10 md:px-8 lg:px-16">
      <div className="flex flex-col gap-5 items-center justify-center mt-[5em]">
        <h1 className="text-[4em] text-center leading-none font-bold">
          Secure and transparent<br></br>
          <span className="text-primary font-bricolage">
            Escrow on Ethereum
          </span>
        </h1>
        <p className="max-w-xl text-center text-lg">EscrowLink is a decentralized escrow platform built on Ethereum. It leverages smart contracts to secure funds and ensure transparent, trustless transactions between parties.</p>
      </div>
    </div>
  );
};

export default Hero;
