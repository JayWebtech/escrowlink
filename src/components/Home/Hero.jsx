"use client";
import React from "react";
import { motion } from "framer-motion";
import Button from "../Form/Button";
import { useRouter } from "next/navigation";
import ConnectWalletButton from "../Form/ConnectWalletButton";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 sm:px-10 md:px-8 lg:px-16">
      <div className="flex flex-col gap-5 items-center justify-center mt-[5em]">
        <motion.h1
          className="text-[2em] lg:text-[4em] text-center leading-none font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Secure and transparent<br></br>
          <span className="text-primary font-bricolage">
            Escrow on Ethereum
          </span>
        </motion.h1>
        <motion.p
          className="max-w-xl text-center text-sm lg:text-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          EscrowLink is a decentralized escrow platform built on Ethereum. It
          leverages smart contracts to secure funds and ensure transparent,
          trustless transactions between parties.
        </motion.p>
        <motion.div
          className="flex gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ConnectWalletButton size="md" />
          <Button size="md" type="outline">
            Learn more
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
