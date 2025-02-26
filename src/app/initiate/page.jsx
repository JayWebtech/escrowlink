"use client";
import React, { useState } from "react";
import Button from "../../components/Form/Button";
import Link from "next/link";

const Dashboard = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <div className="h-screen hero-section flex flex-col justify-center">
      <div className="container mx-auto px-4 sm:px-10 md:px-8 lg:px-16">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold text-white font-bricolage text-center">
            <span className="text-primary font-bricolage">Escrow</span>Link
          </h1>
        </Link>
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

          <div className="mb-6">
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
            />
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
            />
          </div>

          <div className="flex items-center justify-between">
            <Button
              className={`w-full py-3 text-xl rounded-lg transition-all`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Initiate Escrow"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
