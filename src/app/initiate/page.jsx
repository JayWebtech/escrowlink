"use client";
import React, { useEffect, useState } from "react";
import Button from "../../components/Form/Button";
import Link from "next/link";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  usePublicClient
} from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { fetchEthPrice } from "@/api/api";
import Loader from "@/components/Loader";
import { EscrowLinkABI } from "@/contracts/abi";
import toast from "react-hot-toast";
import { ethToWei } from "@/utils/ethToWei";
import { motion } from "framer-motion";
import { generateEscrowId } from "@/utils/generateEscrowId";
import NotConnected from "@/components/NotConnected";
import { Copy, Check } from "lucide-react";
import WaitingSpinner from "@/components/WaitingSpinner";
import { weiToEth } from "@/utils/weiToEth";

const Initiate = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [terms, setTerms] = useState("");
  const [usdEquivalent, setUsdEquivalent] = useState(null);
  const [isInitiate, setIsInitiate] = useState(false);
  const { address } = useAccount();
  const [escrowId] = useState(generateEscrowId());
  const [isCopied, setIsCopied] = useState(false);
  const [escrowDetails, setEscrowDetails] = useState(null);

  const {
    data: hash,
    writeContract,
    isPending: writePending,
  } = useWriteContract();

  const {
    data: ethPrice,
    isPending,
    error,
  } = useQuery({ queryKey: ["ethPrice"], queryFn: fetchEthPrice });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

    useWatchContractEvent({
    ...EscrowLinkABI,
    eventName: 'PayeeHasJoined',
    onLogs(logs) {
      console.log(logs)
      if(logs[0].eventName == "PayeeHasJoined"){
        setEscrowDetails(logs[0].args);
      }
    },
  })

  useWatchContractEvent({
    ...EscrowLinkABI,
    eventName: 'EscrowCompleted',
    onLogs(logs) {
      if(logs[0].eventName == "EscrowCompleted"){
        toast.success("Escrow has been completely, thank you for using escrowlink.");
        setTimeout(() => {
          window.location.href = "/"
        }, 10000);
      }
    },
  })

  useEffect(() => {
    if (ethPrice && amount) {
      const usdValue = parseFloat(amount) * ethPrice;
      setUsdEquivalent(usdValue.toFixed(2));
    } else {
      setUsdEquivalent(null);
    }
  }, [amount, ethPrice]);

  useEffect(() => {
    if (isSuccess) {
      if(!escrowDetails){
        toast.success("Escrow initiated successfully");
      }
      setIsInitiate(true);
    }
  }, [isSuccess]);

  if (isPending) {
    return <Loader />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      writeContract({
        ...EscrowLinkABI,
        functionName: "createEscrow",
        args: [recipient, ethToWei(amount), terms, escrowId],
        value: ethToWei(amount),
      });
      console.log(ethToWei(amount));
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error("Transaction failed");
    }
  };

  const releaseFunds = () => {
    writeContract({
      ...EscrowLinkABI,
      functionName: "releaseFunds",
      args: [escrowId],
      account: address
    });
  }

  const handleCopy = () => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/join-escrow/${escrowId}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="h-screen hero-section flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-10 md:px-8 lg:px-16">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold text-white font-bricolage text-center">
            <span className="text-primary font-bricolage">Escrow</span>
            Link
          </h1>
        </Link>
        {address ? (
          <>
            {isInitiate ? (
              <div className="flex flex-col items-center max-w-lg mx-auto bg-white backdrop-blur-3xl p-8 rounded-xl shadow-xl mt-5">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="mb-8 text-center text-black"
                >
                  <h1 className="text-3xl font-bold">Escrow is Processed</h1>
                  <p className="text-lg mt-2">
                    Please share this link to the recipient to join: <br></br>
                    
                  </p>
                  <p className="bg-primary py-1 rounded-md">{window.location.origin}/join-escrow/{escrowId}
                    <button onClick={handleCopy} className="ml-2">
                      {isCopied ? (
                        <Check size={16} className="inline-block text-black" />
                      ) : (
                        <Copy size={16} className="inline-block text-black transition-colors" />
                      )}
                    </button></p>
                </motion.div>
                {escrowDetails ? (
                  <div className="text-black">
                    <p>Recipient has joined the escrow</p>
                    <p>Amount: <span className="font-semibold">{weiToEth(escrowDetails.amount)}ETH</span></p>
                    <p>Terms: <span className="font-semibold">{escrowDetails.terms}</span></p>
                    <p>Payment status: <span className="font-semibold">{escrowDetails.isPaid ? "Paid" : "Not paid"}</span></p>
                    <p>Recipient Addr: <span className="font-semibold">{escrowDetails.payee}</span></p>
                    <div className="flex gap-5 mt-3">
                      <Button
                      className={`flex items-center justify-center gap-2 ${
                        writePending || isConfirming
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={writePending || isConfirming}
                      onClick={releaseFunds}
                    >
                      {writePending || isConfirming ? (
                        <motion.div className="w-4 h-4 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />
                      ) : null}
                      {writePending
                        ? "Processing..."
                        : isConfirming
                        ? "Confirming transaction..."
                        : "Release funds"}
                    </Button>
                    </div>
                  </div>
                ):(
                  <WaitingSpinner />
                )}
                
              </div>
            ) : (
              <>
                <h1 className="text-4xl font-bold text-center text-white my-8">
                  Initiate Escrow
                </h1>

                <form
                  onSubmit={handleSubmit}
                  className="max-w-lg mx-auto bg-white backdrop-blur-3xl p-8 rounded-xl shadow-xl"
                >
                  <div className="mb-6">
                    <label
                      className="block text-lg font-semibold text-background mb-2"
                      htmlFor="recipient"
                    >
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      id="recipient"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder="0x..."
                      className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-background leading-tight focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-transparent"
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      className="block text-lg font-semibold text-background mb-2"
                      htmlFor="amount"
                    >
                      Amount (ETH)
                    </label>
                    <input
                      type="number"
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Amount in ETH"
                      className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-background leading-tight focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-transparent"
                      required
                      min="0"
                      inputMode="decimal"
                      step="any"
                    />
                  </div>
                  <div className="mb-6">
                    {ethPrice && !isPending && usdEquivalent !== null && (
                      <label className="block text-sm text-gray-600">
                        Equivalent in USD: ${usdEquivalent.toLocaleString()}
                      </label>
                    )}
                    {isPending && (
                      <div className="text-sm">Loading ETH price...</div>
                    )}
                    {error && (
                      <div className="text-sm">Error fetching ETH price</div>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-lg font-semibold text-background mb-2"
                      htmlFor="terms"
                    >
                      Terms and Conditions
                    </label>
                    <textarea
                      id="terms"
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                      placeholder="Enter the terms for the escrow agreement..."
                      className="shadow-md appearance-none border rounded-lg w-full py-3 px-4 text-background leading-tight focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-transparent"
                      required
                      maxLength={500}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <Button
                      className={`w-full py-3 text-xl rounded-lg transition-all flex items-center justify-center gap-2 ${
                        writePending || isConfirming
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={writePending || isConfirming}
                    >
                      {writePending || isConfirming ? (
                        <motion.div className="w-4 h-4 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />
                      ) : null}
                      {writePending
                        ? "Processing..."
                        : isConfirming
                        ? "Confirming transaction..."
                        : "Initiate Escrow"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </>
        ) : (
          <NotConnected />
        )}
      </div>
    </div>
  );
};

export default Initiate;
