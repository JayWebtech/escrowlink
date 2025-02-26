import JoinEscrow from "./join_escrow";

export default async function Page({ params }) {
  const escrowId = (await params).escrow_id;
  console.log(escrowId)
  return <JoinEscrow escrowId={escrowId} />;
}
