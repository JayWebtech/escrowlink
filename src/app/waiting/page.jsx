"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../../components/Form/Button";
import Link from "next/link";

const WaitingPage = () => {
  const [loading, setLoading] = useState(true);
  const [escrowId, setEscrowId] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
      setEscrowId("0x1234567890abcdef");
    }, 5000); 
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center hero-section">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold">Escrow is Being Processed</h1>
        <p className="text-lg mt-4">Please wait while we finalize your transaction.</p>
      </motion.div>

      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="w-20 h-20 border-4 border-t-4 border-white rounded-full mb-8"
      />

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-xl font-semibold">Escrow Initiated Successfully!</h2>
          <p className="mt-2">Your escrow ID is:</p>
          <p className="text-lg font-bold">{escrowId}</p>
        </motion.div>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-8"
      >
        <Link href="/dashboard">
          <Button className="px-6 py-3 text-lg bg-white text-black rounded-lg">
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default WaitingPage;
