export const EscrowLinkABI = {
  address: "0xF569253Dbf585CeE6FCa80Ad9AD201fC236bbEd5",
  abi: [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "escrow_id",
          type: "uint16",
        },
      ],
      name: "EscrowCompleted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "payer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "payee",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        { indexed: false, internalType: "bool", name: "isPaid", type: "bool" },
        {
          indexed: false,
          internalType: "string",
          name: "terms",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint16",
          name: "escrow_id",
          type: "uint16",
        },
      ],
      name: "PayeeHasJoined",
      type: "event",
    },
    {
      inputs: [],
      name: "contractOwner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address payable", name: "_payee", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
        { internalType: "string", name: "_terms", type: "string" },
        { internalType: "uint16", name: "_escrow_id", type: "uint16" },
      ],
      name: "createEscrow",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      name: "escrows",
      outputs: [
        { internalType: "address payable", name: "payer", type: "address" },
        { internalType: "address payable", name: "payee", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "bool", name: "isPaid", type: "bool" },
        { internalType: "string", name: "terms", type: "string" },
        { internalType: "uint16", name: "escrow_id", type: "uint16" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint16", name: "_escrow_id", type: "uint16" }],
      name: "getEscrowDetails",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint16", name: "_escrow_id", type: "uint16" }],
      name: "releaseFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
