import ReturnRequest from "@/components/pages/heathNote/gutCheck/returnRequest/ReturnRequest";

interface ReturnRequestPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReturnRequestPage({
  params,
}: ReturnRequestPageProps) {
  const { id } = await params;
  
  return (
    <ReturnRequest />
  );
}
