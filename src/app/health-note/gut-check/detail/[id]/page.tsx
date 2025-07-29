import GutCheckDetail from "@/components/pages/heathNote/gutCheck/detail/GutCheckDetail";

interface GutCheckDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GutCheckDetailPage({
  params,
}: GutCheckDetailPageProps) {
  const { id } = await params;
  const diagnosisId = parseInt(id, 10);

  return <GutCheckDetail diagnosisId={diagnosisId} />;
}
