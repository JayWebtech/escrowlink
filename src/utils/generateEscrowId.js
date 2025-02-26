export const generateEscrowId = () => {
  const timestamp = Math.floor(Date.now() / 1000);
  const escrowId = timestamp % 65536;
  return escrowId;
};
