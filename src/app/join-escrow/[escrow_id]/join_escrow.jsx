"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import WaitingSpinner from "@/components/WaitingSpinner";
import {
  useWatchContractEvent,
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import NotConnected from "@/components/NotConnected";
import { EscrowLinkABI } from "@/contracts/abi";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import AccountButton from "@/components/Form/AccountButton";
import { weiToEth } from "@/utils/weiToEth";
import Link from "next/link";

const JoinEscrow = ({ escrowId }) => {
  const { address } = useAccount();
  const [escrowDetails, setEscrowDetails] = useState(null);

  const {
    data: hash,
    writeContract,
    isPending: writePending,
    error,
  } = useWriteContract();

  useWatchContractEvent({
    ...EscrowLinkABI,
    eventName: "PayeeHasJoined",
    onLogs(logs) {
      if(logs[0].eventName == "PayeeHasJoined"){
        setEscrowDetails(logs[0].args);
      }
     
    },
  });

  useWatchContractEvent({
    ...EscrowLinkABI,
    eventName: 'EscrowCompleted',
    onLogs(logs) {
      if(logs[0].eventName == "EscrowCompleted"){
        toast.success("Escrow has been completely, funds will be remitted to your account very soon!.");
        setTimeout(() => {
          window.location.href = "/"
        }, 10000);
      }
    },
  })

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (address) {
      writeContract({
        ...EscrowLinkABI,
        functionName: "getEscrowDetails",
        args: [escrowId],
        account: address,
      });
    }
  }, [address]);

  if (writePending && address) {
    return <Loader />;
  }
  if (isConfirming) {
    return <Loader />;
  }

  return (
    <div className="h-screen hero-section flex flex-col justify-center">
      <Link href={"/"}>
          <h1 className="text-2xl font-bold text-white font-bricolage text-center">
            <span className="text-primary font-bricolage">Escrow</span>
            Link
          </h1>
        </Link>
      {address ? (
        <>
          <div className="flex flex-col items-center max-w-lg mx-auto bg-white backdrop-blur-3xl p-8 rounded-xl shadow-xl mt-5">
            {error ? (
              <div className="text-center text-red-500">
                <h1 className="text-3xl font-bold">Error</h1>
                <p className="text-lg my-2">
                  {error.message ||
                    "An error occurred while fetching escrow details"}
                </p>
                <AccountButton />
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="mb-8 text-center text-black"
                >
                  <h1 className="text-3xl font-bold">Escrow is Processed</h1>
                </motion.div>
                {escrowDetails ? (
                  <div className="text-black">
                    
                    <p>Amount: <span className="font-semibold">{weiToEth(escrowDetails.amount)}ETH</span></p>
                    <p>Terms: <span className="font-semibold">{escrowDetails.terms}</span></p>
                    <p>Payment status: <span className="font-semibold">{escrowDetails.isPaid ? "Paid" : "Not paid"}</span></p>
                    <p>Payer's Addr: <span className="font-semibold">{escrowDetails.payer}</span></p>
                    <p>Wait for sender's approval for funds to be release</p>
                    <div className="flex justify-center mt-5">
                    <WaitingSpinner />
                    </div>
                  </div>
                ):(
                  <WaitingSpinner />
                )}
                
              </>
            )}
          </div>
        </>
      ) : (
        <NotConnected />
      )}
    </div>
  );
};

export default JoinEscrow;
